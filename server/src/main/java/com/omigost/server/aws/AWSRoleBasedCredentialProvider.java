package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.securitytoken.AWSSecurityTokenService;
import com.amazonaws.services.securitytoken.AWSSecurityTokenServiceClientBuilder;
import com.amazonaws.services.securitytoken.model.AssumeRoleRequest;
import com.amazonaws.services.securitytoken.model.AssumeRoleResult;
import com.amazonaws.services.securitytoken.model.Credentials;
import com.omigost.server.config.AWSCredentialsConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AWSRoleBasedCredentialProvider {
    @Value("${aws.region}")
    private String region;
    final String roleARN = "arn:aws:iam::537952477028:role/AccessToAll";
    final String roleSessionName = "53a56s89765";

    @Autowired
    private AWSCredentialsConfig config;

    //TODO should be fetched from db
    public AWSCredentialsProvider getCredentialsForUser(String userId) {
        AWSCredentialsProvider nonRootCredentials = config.getNonRootCredentials();

        AWSSecurityTokenService stsClient = AWSSecurityTokenServiceClientBuilder.standard()
                .withCredentials(nonRootCredentials)
                .withRegion(region)
                .build();

        AssumeRoleRequest roleRequest = new AssumeRoleRequest()
                .withRoleArn(roleARN)
                .withRoleSessionName(roleSessionName);

        AssumeRoleResult assumeRoleResult = stsClient.assumeRole(roleRequest);
        Credentials sessionCredentials = assumeRoleResult.getCredentials();

        BasicSessionCredentials basicSessionCredentials = new BasicSessionCredentials(
                sessionCredentials.getAccessKeyId(), sessionCredentials.getSecretAccessKey(),
                sessionCredentials.getSessionToken());

        return new AWSStaticCredentialsProvider(basicSessionCredentials);
    }
}
