package com.omigost.server.config;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AWSCredentials {

    @Getter
    @Value("${aws.accessKey:#{environment.AWS_ACCESS_KEY}}")
    private String accessKey;

    @Getter
    @Value("${aws.secretKey:#{environment.AWS_SECRET_KEY}}")
    private String secretKey;

    @Getter
    @Value("${aws.region}")
    private String awsRegion;

    public AWSCredentialsProvider getProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey));
    }
}
