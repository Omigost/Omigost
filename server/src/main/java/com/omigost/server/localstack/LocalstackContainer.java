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

    @Value("${localstack.services.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.services.ip:localhost}")
    private String externalIP;

    @Value("${localstack.services.sns.port:4575}")
    private int externalSNSPort;

    @Value("${localstack.services.dumb.port:4567}")
    private int externalNothingPort;

    private void ensureContainerIsPresent() {
        container = new LocalStackContainer()
            .withServices(
                    LocalStackContainer.Service.SNS,
                    LocalStackContainer.Service.API_GATEWAY
            );
    }

    public void launch() {
        if (!useExternal && !container.isRunning()) {
            ensureContainerIsPresent();
            container.start();
        }
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointSNS() {
        if (useExternal) {
            return new AwsClientBuilder.EndpointConfiguration("http://" + externalIP + ":" + externalSNSPort, awsRegion);
        }
        ensureContainerIsPresent();
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.SNS).getServiceEndpoint(),
                awsRegion
        );
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointNothing() {
        if (useExternal) {
            return new AwsClientBuilder.EndpointConfiguration("http://" + externalIP + ":" + externalNothingPort, awsRegion);
        }
        ensureContainerIsPresent();
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.API_GATEWAY).getServiceEndpoint(),
                awsRegion
        );
    }

    public AWSCredentialsProvider getCredentailsProvider() {
        return container.getDefaultCredentialsProvider();
    }
}