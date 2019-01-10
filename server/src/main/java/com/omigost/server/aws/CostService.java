package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.AWSCostExplorerClientBuilder;
import com.amazonaws.services.costexplorer.model.*;
import com.omigost.server.rest.dto.AWSDailySpending;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CostService {
    @Value("${aws.region}")
    private String region;
    private final AWSCredentialsProvider credentialsProvider;
    private AWSCostExplorer client;

    private static final String COST_TYPE = "BlendedCost";

    @Autowired
    public CostService(AWSCredentialsProvider credentialsProvider) {
        this.credentialsProvider = credentialsProvider;
    }

    @PostConstruct
    void init() {
        client = AWSCostExplorerClientBuilder
                .standard()
                .withRegion(region)
                .withCredentials(credentialsProvider)
                .build();
    }

    private GetCostAndUsageRequest defaultRequest() {
        return new GetCostAndUsageRequest()
                .withGranularity(Granularity.DAILY)
                .withMetrics(COST_TYPE);
    }

    private List<AWSDailySpending> fetchSpending(GetCostAndUsageRequest request) {

        List<ResultByTime> results = new ArrayList<>();
        GetCostAndUsageResult response = null;

        //TODO test properly
        while (response == null || response.getNextPageToken() != null) {
            response = client.getCostAndUsage(request);

            results.addAll(response.getResultsByTime());
            request.setNextPageToken(response.getNextPageToken());
        }

        List<AWSDailySpending> spendings = new ArrayList<>();
        for (ResultByTime resultByTime : results) {
            AWSDailySpending spending = new AWSDailySpending();

            spending.setDay(resultByTime.getTimePeriod().getStart());
            spending.setSpending(resultByTime.getTotal().get(COST_TYPE).getAmount());
            spending.setUnit(resultByTime.getTotal().get(COST_TYPE).getUnit());

            spendings.add(spending);
        }

        return spendings;
    }


    public List<AWSDailySpending> getSpendingForAccount(DateInterval interval, String userId) {
        Expression linkedAccountFilter = new Expression()
                .withDimensions(new DimensionValues().withKey(Dimension.LINKED_ACCOUNT).withValues(userId));

        GetCostAndUsageRequest request = defaultRequest()
                .withFilter(linkedAccountFilter)
                .withTimePeriod(interval);

        return fetchSpending(request);
    }



    List<ResultByTime> getLastMonthCost() {
        TagValues tagValues=new TagValues();
        tagValues.setKey("billable");
        tagValues.setValues(Collections.singleton("true"));

        Expression expression = new Expression().withTags(tagValues);

        GetCostAndUsageRequest request = new GetCostAndUsageRequest()
                .withGranularity(Granularity.DAILY)
                .withMetrics("BlendedCost")
                .withFilter(expression)
                .withTimePeriod(new DateInterval().withStart("2018-12-01").withEnd("2019-01-09"));

        GetCostAndUsageResult result = client.getCostAndUsage(request);

        List<ResultByTime> resultByTimes = result.getResultsByTime();

        return resultByTimes;
    }


}
