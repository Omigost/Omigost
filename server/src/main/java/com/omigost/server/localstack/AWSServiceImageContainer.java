package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Slf4j
@Component
public abstract class AWSServiceImageContainer extends GenericContainer<BudgetsContainer> implements ImageContainer {

    @Value("${aws.region}")
    private String awsRegion;

    @Value("${aws.accessKey}")
    private String accessKey;

    @Value("${aws.secretKey}")
    private String secretKey;

    private boolean wasInitialized = false;

    public AWSServiceImageContainer() {
        super();
    }

    public abstract String getServiceStartMessage();

    public abstract String getServiceImageName();

    public abstract int getServicePort();

    @Override
    protected void configure() {
        super.configure();
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointConfiguration() {
        final String address = getContainerIpAddress();
        String ipAddress = address;
        try {
            ipAddress = InetAddress.getByName(address).getHostAddress();
        } catch (UnknownHostException e) {
            log.error("Could not determine host for AWS docker service", e);
        }
        ipAddress = ipAddress + ".nip.io";

        return new AwsClientBuilder.EndpointConfiguration(
                "http://" +
                        ipAddress +
                        ":" +
                        getMappedPort(getServicePort()), awsRegion);
    }

    public AWSCredentialsProvider getDefaultCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey));
    }

    public void launch() {
        if (!wasInitialized) {
            this.setDockerImageName(getServiceImageName());
            withFileSystemBind("//var/run/docker.sock", "/var/run/docker.sock");
            waitingFor(Wait.forLogMessage(".*" + getServiceStartMessage() + ".*", 1));
            wasInitialized = true;
        }
        if (!isRunning()) {
            start();
        }
    }


}