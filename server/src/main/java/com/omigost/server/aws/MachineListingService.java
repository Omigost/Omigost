package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.*;
import com.amazonaws.services.organizations.model.Account;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
        return getReservations(userId).stream()
                .map(Reservation::getInstances)
                .flatMap(List::stream)
                .filter(this::isInstanceRunning)
                .map(Instance::getInstanceId)
                .collect(Collectors.toList());
    }

    private List<Reservation> getReservations(String userId) {
        AmazonEC2 amazonEC2 = getAmazonEC2ForClient(userId);
        Filter ownerIdFilter = new Filter(ownerFilterKey, Collections.singletonList(userId));
        DescribeInstancesRequest request = new DescribeInstancesRequest().withFilters(ownerIdFilter);
        DescribeInstancesResult instancesResult = amazonEC2.describeInstances(request);
        return instancesResult.getReservations();
    }

}
