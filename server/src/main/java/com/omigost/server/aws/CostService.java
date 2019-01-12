package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.AWSCostExplorerClientBuilder;
import com.amazonaws.services.costexplorer.model.*;
import com.omigost.server.rest.dto.AWSDailySpendingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    private List<AWSDailySpendingDTO> fetchSpending(GetCostAndUsageRequest request) {

        List<ResultByTime> results = new ArrayList<>();
        GetCostAndUsageResult response = null;

        while (response == null || response.getNextPageToken() != null) {
            response = client.getCostAndUsage(request);

            results.addAll(response.getResultsByTime());
            request.setNextPageToken(response.getNextPageToken());
        }

        List<AWSDailySpendingDTO> spendings = new ArrayList<>();
        for (ResultByTime resultByTime : results) {
            AWSDailySpendingDTO spending = new AWSDailySpendingDTO();

            spending.setDay(resultByTime.getTimePeriod().getStart());
            spending.setSpending(resultByTime.getTotal().get(COST_TYPE).getAmount());
            spending.setUnit(resultByTime.getTotal().get(COST_TYPE).getUnit());

            spendings.add(spending);
        }

        return spendings;
    }


    public List<AWSDailySpendingDTO> getSpendingForAccount(DateInterval interval, String userId) {
        Expression linkedAccountFilter = new Expression()
                .withDimensions(new DimensionValues().withKey(Dimension.LINKED_ACCOUNT).withValues(userId));

        GetCostAndUsageRequest request = defaultRequest()
                .withFilter(linkedAccountFilter)
                .withTimePeriod(interval);

        return fetchSpending(request);
    }

    //tags should be activated from amazon account
    public List<AWSDailySpendingDTO> getSpendingForTags(DateInterval interval, Map<String, List<String>> tagValues) {
        Expression accumulativeExpression = new Expression();

        tagValues.entrySet().stream()
                .findFirst()
                .map(entry-> new TagValues().withKey(entry.getKey()).withValues(entry.getValue()))
                .ifPresent(accumulativeExpression::setTags);

        tagValues.entrySet().stream()
                .skip(1)
                .map(entry-> new TagValues().withKey(entry.getKey()).withValues(entry.getValue()))
                .map(tag ->new Expression().withTags(tag) )
                .forEach(accumulativeExpression::withAnd);

        GetCostAndUsageRequest request = defaultRequest()
                .withFilter(accumulativeExpression)
                .withTimePeriod(interval);

        return fetchSpending(request);
    }


}
