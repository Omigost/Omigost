package com.omigost.server.aws.termination;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.StopDBInstanceRequest;
import com.omigost.server.aws.AWSRoleBasedCredentialProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RDSTerminationService {
    @Value("${aws.region}")
    private String region;


    @Autowired
    public AWSRoleBasedCredentialProvider awsRoleBasedCredentialProvider;

    private AmazonRDS getAmazonRDSForUser(String userId) {
        AWSCredentialsProvider awsCredentialsProvider = awsRoleBasedCredentialProvider.getCredentialsForUser(userId);
        return AmazonRDSClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentialsProvider)
                .build();
    }

    private StopDBInstanceRequest stoppingRequest(String dbName) {
        return new StopDBInstanceRequest().withDBInstanceIdentifier(dbName);
    }

    public void stop(String rdsName, String userId) {
        StopDBInstanceRequest request = stoppingRequest(rdsName);
        getAmazonRDSForUser(userId).stopDBInstance(request);
    }

    public void stop(List<String> rdsNames, String userId) {
        if (rdsNames.isEmpty()) return;
        rdsNames.forEach(rds -> stop(rds, userId));
    }

}
