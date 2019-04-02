package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.StopDBInstanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class RDSTerminationService {
    @Value("${aws.region}")
    private String region;

    private AmazonRDS amazonRDS;

    @Autowired
    private AWSCredentialsProvider awsCredentials;

    @PostConstruct
    private void init() {
        amazonRDS = AmazonRDSClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();
    }

    private StopDBInstanceRequest stoppingRequest(String dbName) {
        return new StopDBInstanceRequest().withDBInstanceIdentifier(dbName);
    }

    public void stop(String rdsName) {

        StopDBInstanceRequest request = stoppingRequest(rdsName);
        amazonRDS.stopDBInstance(request);
    }

    public void stop(List<String> rdsNames) {
        if (rdsNames.isEmpty()) return;
        rdsNames.forEach(this::stop);
    }

}
