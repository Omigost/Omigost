package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.AWSCostExplorerClientBuilder;
import com.amazonaws.services.costexplorer.model.DateInterval;
import com.amazonaws.services.costexplorer.model.GetTagsRequest;
import com.amazonaws.services.costexplorer.model.GetTagsResult;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaggingService {
    /**
     * The DateInterval should be smaller than 12 months
     */
    @Value("${aws.region}")
    private String region;

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    @Autowired
    private AWSCostExplorer costExplorer;

    @Autowired
    private AmazonEC2 amazonEC2;

    public List<Tag> fetchEC2CostAllocationTags(DateInterval dateInterval) {
        List<String> tagKeys = fetchAllCostAllocationTagKeys(dateInterval);
        return getTagValues(tagKeys);
    }

    public List<String> fetchAllCostAllocationTagKeys(DateInterval dateInterval) {
        GetTagsRequest baseRequest = new GetTagsRequest().withTimePeriod(dateInterval);
        ArrayList<String> tagKeys = new ArrayList<>();

        String nextPageToken = null;
        do {
            GetTagsResult result = costExplorer.getTags(baseRequest.withNextPageToken(nextPageToken));
            nextPageToken = result.getNextPageToken();
            tagKeys.addAll(result.getTags());
        } while (nextPageToken != null && !nextPageToken.isEmpty());

        return tagKeys;
    }

    private List<Tag> fetchAllTagsWithKey(DescribeTagsRequest describeTagsRequest, String key) {
        String nextPageToken = null;
        List<Tag> tags = new ArrayList<>();

        do {
            DescribeTagsResult result = amazonEC2.describeTags(describeTagsRequest.withNextToken(nextPageToken));

            List<String> values = result.getTags().stream().map(TagDescription::getValue).collect(Collectors.toList());
            List<Tag> tagsWithGivenKey = values.stream().map(value -> new Tag(key, value)).collect(Collectors.toList());
            tags.addAll(tagsWithGivenKey);

            nextPageToken = result.getNextToken();
        } while (nextPageToken != null && !nextPageToken.isEmpty());

        return tags;
    }

    private List<Tag> getTagValues(List<String> keys) {
        List<Tag> allTags = new ArrayList<>();

        for (String key : keys) {
            Filter keyFilter = new Filter().withName("key").withValues(key);
            DescribeTagsRequest request = new DescribeTagsRequest().withFilters(keyFilter);

            allTags.addAll(fetchAllTagsWithKey(request, key));
        }

        return allTags;
    }
}
