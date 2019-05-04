package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.testcontainers.containers.localstack.LocalStackContainer;

@Component
public class LocalstackContainer implements ImageContainer {

    LocalStackContainer container;

    @Value("${aws.region}")
    private String awsRegion;

    public LocalstackContainer() {
        container = new LocalStackContainer()
                .withServices(
                        LocalStackContainer.Service.SNS,
                        LocalStackContainer.Service.API_GATEWAY
                );
    }

    public void launch() {
        if (!container.isRunning()) {
            container.start();
        }
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointSNS() {
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.SNS).getServiceEndpoint(),
                awsRegion
        );
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointNothing() {
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.API_GATEWAY).getServiceEndpoint(),
                awsRegion
        );
    }

    public AWSCredentialsProvider getCredentialsProvider() {
        return container.getDefaultCredentialsProvider();
    }
}