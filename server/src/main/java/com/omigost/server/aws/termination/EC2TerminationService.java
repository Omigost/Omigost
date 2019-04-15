package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.StopInstancesRequest;
import com.amazonaws.services.ec2.model.TerminateInstancesRequest;
import com.omigost.server.aws.AWSRoleBasedCredentialProvider;
import com.omigost.server.aws.MachineListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EC2TerminationService {
    @Value("${aws.region}")
    private String region;
    @Autowired
    MachineListingService machineListingService;

    @Autowired
    AWSRoleBasedCredentialProvider awsRoleBasedCredentialProvider;

    private StopInstancesRequest stoppingRequest(List<String> machineIds) {
        return new StopInstancesRequest().withForce(false).withInstanceIds(machineIds);
    }

    private AmazonEC2 getAmazonEC2ClientForUser(String userId) {
        AWSCredentialsProvider userRoleProvider = awsRoleBasedCredentialProvider.getCredentialsForUser(userId);
        return AmazonEC2ClientBuilder
                .standard()
                .withCredentials(userRoleProvider)
                .withRegion(region)
                .build();
    }

    public void stop(List<String> machineIds, String userId) {
        if (machineIds.isEmpty()) return;
        StopInstancesRequest request = stoppingRequest(machineIds).withHibernate(false);
        getAmazonEC2ClientForUser(userId).stopInstances(request);
    }

    public void terminate(List<String> machineIds, String userId) {
        if (machineIds.isEmpty()) return;
        TerminateInstancesRequest request = new TerminateInstancesRequest().withInstanceIds(machineIds);
        getAmazonEC2ClientForUser(userId).terminateInstances(request);
    }

    public void hibernate(List<String> machineIds, String userId) {
        if (machineIds.isEmpty()) return;
        StopInstancesRequest request = stoppingRequest(machineIds).withHibernate(true);
        getAmazonEC2ClientForUser(userId).stopInstances(request);
    }

    public void terminateRunningUserInsatnace(String awsUserId) {
        List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(awsUserId);
        terminate(runningEC2Instances, awsUserId);
    }

}
