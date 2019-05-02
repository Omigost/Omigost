package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.omigost.server.config.AWSCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.testcontainers.containers.localstack.LocalStackContainer;

@Component
public class LocalstackContainer implements ImageContainer {

    private LocalStackContainer container = null;

    @Autowired
    private AWSCredentials creds;

    @Value("${localstack.services.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.services.ip:localhost}")
    private String externalIP;

    @Value("${localstack.services.sns.port:4575}")
    private int externalSNSPort;

    @Value("${localstack.services.dumb.port:4567}")
    private int externalNothingPort;

    private void ensureContainerIsPresent() {
        if (container != null) {
            return;
        }
        container = new LocalStackContainer()
            .withServices(
                    LocalStackContainer.Service.SNS,
                    LocalStackContainer.Service.API_GATEWAY
            );
    }

    public void launch() {
        if (!useExternal && (container == null || !container.isRunning())) {
            ensureContainerIsPresent();
            container.start();
        }
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointSNS() {
        if (useExternal) {
            return new AwsClientBuilder.EndpointConfiguration("http://" + externalIP + ":" + externalSNSPort, creds.getAwsRegion());
        }
        ensureContainerIsPresent();
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.SNS).getServiceEndpoint(),
                creds.getAwsRegion()
        );
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointNothing() {
        if (useExternal) {
            return new AwsClientBuilder.EndpointConfiguration("http://" + externalIP + ":" + externalNothingPort, creds.getAwsRegion());
        }
        ensureContainerIsPresent();
        return new AwsClientBuilder.EndpointConfiguration(
                container.getEndpointConfiguration(LocalStackContainer.Service.API_GATEWAY).getServiceEndpoint(),
                creds.getAwsRegion()
        );
    }
}