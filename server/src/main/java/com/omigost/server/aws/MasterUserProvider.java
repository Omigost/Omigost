package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MasterUserProvider {

    @Value("${aws.region}")
    String region;

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    @Autowired
    private AmazonIdentityManagement amazonIdentityManagement;

    public String getMasterUserId() {
        // Extracting accountId from arn
        return amazonIdentityManagement.getUser().getUser().getArn().split(":")[4];
    }
}
