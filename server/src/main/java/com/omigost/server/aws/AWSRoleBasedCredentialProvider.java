package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.securitytoken.AWSSecurityTokenService;
import com.amazonaws.services.securitytoken.AWSSecurityTokenServiceClientBuilder;
import com.amazonaws.services.securitytoken.model.AssumeRoleRequest;
import com.amazonaws.services.securitytoken.model.AssumeRoleResult;
import com.amazonaws.services.securitytoken.model.Credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.UUID;

@Service
public class AWSRoleBasedCredentialProvider {
    @Value("${aws.region}")
    private String region;
    @Value("${aws.generalAccessRole}")
    private String roleName;

    /**
     * The idea is that every developer will create a role called AccessToAll role
     * The role's trusted entity will be only the root user
     * The application impersonate that role and carry out the maintenance
     */
    private String getRoleARN(String userId) {
        return "arn:aws:iam::" + userId + ":role/" + roleName;
    }

    String generateRoleSessionName(String userId) {
        final String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 4);
        String timeStamp = String.valueOf(System.currentTimeMillis());
        return userId + "-" + timeStamp + "-" + uuid;
    }

    @Autowired
    @Qualifier("iamCredentials")
    private AWSCredentialsProvider iamCredentials;
    private AWSSecurityTokenService stsClient;

    @PostConstruct
    void init() {
        stsClient = AWSSecurityTokenServiceClientBuilder.standard()
                .withCredentials(iamCredentials)
                .withRegion(region)
                .build();
    }

    public AWSCredentialsProvider getCredentialsForUser(String userId) {
        String roleARN = getRoleARN(userId);

        AssumeRoleRequest roleRequest = new AssumeRoleRequest()
                .withRoleArn(roleARN)
                .withRoleSessionName(generateRoleSessionName(userId));

        AssumeRoleResult assumeRoleResult = stsClient.assumeRole(roleRequest);
        Credentials sessionCredentials = assumeRoleResult.getCredentials();

        BasicSessionCredentials basicSessionCredentials = new BasicSessionCredentials(
                sessionCredentials.getAccessKeyId(), sessionCredentials.getSecretAccessKey(),
                sessionCredentials.getSessionToken());

        return new AWSStaticCredentialsProvider(basicSessionCredentials);
    }
}
