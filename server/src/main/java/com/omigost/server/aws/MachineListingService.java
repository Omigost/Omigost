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
    private OrganizationService organizationService;

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    private AmazonEC2 amazonEC2;

    @Getter
    private List<Account> accounts;

    // https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-instances.html
    private final String ownerFilterKey = "owner-id";


    @PostConstruct
    private void initialize() {
        amazonEC2 = AmazonEC2ClientBuilder
                .standard()
                .withCredentials(credentialsProvider)
                .withRegion(region)
                .build();
    }

    private boolean isInstanceRunning(Instance instance) {
        return instance.getState().getName().equals(InstanceStateName.Running.toString());
    }

    public List<String> getRunningEC2Instances(String userId) {
        Filter ownerIdFilter = new Filter(ownerFilterKey, Collections.singletonList(userId));
        DescribeInstancesRequest request = new DescribeInstancesRequest().withFilters(ownerIdFilter);
        DescribeInstancesResult instancesResult = amazonEC2.describeInstances(request);
        List<Reservation> reservations = instancesResult.getReservations();
        return reservations.stream()
                //get all instance ids
                .map(Reservation::getInstances)
                .flatMap(List::stream)
                //filter only running instances
                .filter(this::isInstanceRunning)
                //extract image ids
                .map(Instance::getInstanceId)
                .collect(Collectors.toList());
    }

}
