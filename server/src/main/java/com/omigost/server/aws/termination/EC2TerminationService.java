package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.ec2.model.StopInstancesRequest;
import com.amazonaws.services.ec2.model.TerminateInstancesRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;


@Service
public class EC2TerminationService {
    @Value("${aws.region}")
    private String region;

    private AmazonEC2 amazonEC2;

    @Autowired
    private AWSCredentialsProvider awsCredentials;

    @PostConstruct
    private void init() {
        amazonEC2 = AmazonEC2ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();
    }

    private StopInstancesRequest stoppingRequest(List<String> machineIds) {
        return new StopInstancesRequest().withForce(false).withInstanceIds(machineIds);
    }

    public void stop(List<String> machineIds) {
        StopInstancesRequest request = stoppingRequest(machineIds).withHibernate(false);
        amazonEC2.stopInstances(request);
    }

    public void terminate(List<String> machineIds) {
        TerminateInstancesRequest request = new TerminateInstancesRequest().withInstanceIds(machineIds);
        amazonEC2.terminateInstances(request);
    }

    public void hibernate(List<String> machineIds) {
        StopInstancesRequest request = stoppingRequest(machineIds).withHibernate(true);
        amazonEC2.stopInstances(request);
    }

}
