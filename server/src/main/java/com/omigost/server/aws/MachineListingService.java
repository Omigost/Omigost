package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.*;
import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.model.User;
import lombok.Getter;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class MachineListingService {
    @Value("${aws.region}")
    private String region;

    @Autowired
    AWSRoleBasedCredentialProvider roleBasedCredentialProvider;
    @Getter
    private List<Account> accounts;

    // https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-instances.html
    private final String ownerFilterKey = "owner-id";


    private AmazonEC2 getAmazonEC2ForClient(String userId) {
        AWSCredentialsProvider userRoleProvider = roleBasedCredentialProvider.getCredentialsForUser(userId);
        return AmazonEC2ClientBuilder
                .standard()
                .withCredentials(userRoleProvider)
                .withRegion(region)
                .build();
    }

    private boolean isInstanceRunning(Instance instance) {
        return instance.getState().getName().equals(InstanceStateName.Running.toString());
    }

    public List<String> getRunningEC2Instances(String userId) {
        return getInstanceStream(getReservations(userId))
                .filter(this::isInstanceRunning)
                .map(Instance::getInstanceId)
                .collect(Collectors.toList());
    }

    public Boolean accountHasMachinesWithTags(String userId, com.omigost.server.model.Account account, Map<String, List<String>> tagFilters) {
        List<Instance> instances = getInstanceStream(
                getUserReservationsByTags(userId, account.getAwsId(), tagFilters)
            ).collect(Collectors.toList());
        return !instances.isEmpty();
    }

    @NotNull
    private Stream<Instance> getInstanceStream(List<Reservation> reservations) {
        return reservations.stream()
                .map(Reservation::getInstances)
                .flatMap(List::stream);
    }


    private List<Reservation> getReservations(String userId) {
        return getReservations(userId, Collections.emptyList());
    }

    private List<Reservation> getUserReservationsByTags(String userId, String ownerId, Map<String, List<String>> tagFilters) {
        List<Filter> filters = tagFilters.entrySet().stream()
                .map(entry -> {
                    String tagKey = entry.getKey();
                    List<String> tagList = entry.getValue();
                    return new Filter("tag:" + tagKey, tagList);
                }).collect(Collectors.toList());
        filters.add(new Filter(ownerFilterKey, Collections.singletonList(ownerId)));
        return getReservations(userId, filters);
    }

    private List<Reservation> getReservations(String userId, List<Filter> filters) {
        AmazonEC2 amazonEC2 = getAmazonEC2ForClient(userId);

        Filter ownerIdFilter = new Filter(ownerFilterKey, Collections.singletonList(userId));
        filters.add(ownerIdFilter);

        DescribeInstancesRequest request = new DescribeInstancesRequest().withFilters(filters); // @Gor check what about this
        DescribeInstancesResult instancesResult = amazonEC2.describeInstances(request);
        return instancesResult.getReservations();
    }
}
