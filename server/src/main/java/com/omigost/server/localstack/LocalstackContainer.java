package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder;
import org.springframework.stereotype.Component;
import org.testcontainers.containers.localstack.LocalStackContainer;

@Component
public class LocalstackContainer implements ImageContainer {

    LocalStackContainer container;

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
        return container.getEndpointConfiguration(LocalStackContainer.Service.SNS);
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointNothing() {
        return container.getEndpointConfiguration(LocalStackContainer.Service.API_GATEWAY);
    }

    public AWSCredentialsProvider getCredentialsProvider() {
        return container.getDefaultCredentialsProvider();
    }
}