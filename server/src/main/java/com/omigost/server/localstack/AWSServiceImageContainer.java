package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.omigost.server.config.AWSCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Slf4j
@Component
public abstract class AWSServiceImageContainer implements ImageContainer {

    @Autowired
    private AWSCredentials creds;

    private boolean wasInitialized = false;
    private AWSServiceImage image;

    public abstract boolean willIUseExternalizedContainer();

    public abstract String getServiceStartMessage();

    public abstract String getServiceImageName();

    public abstract String getExternalServiceIP();

    public abstract int getServicePort();

    public void configure() {
        if (image != null) {
            image.configureImage();
        }
    }

    public AWSServiceImage getImage() {
        return image;
    }

    public AwsClientBuilder.EndpointConfiguration getEndpointConfiguration() {
        String ipAddress;
        int port;

        if (willIUseExternalizedContainer()) {
            ipAddress = getExternalServiceIP();
            port = getServicePort();
        } else {
            String address = image.getContainerIpAddress();
            ipAddress = address;
            try {
                ipAddress = InetAddress.getByName(address).getHostAddress();
            } catch (UnknownHostException e) {
                log.error("Could not determine host for AWS docker service", e);
            }
            ipAddress = ipAddress + ".nip.io";
            port = image.getMappedPort(getServicePort());
        }

        return new AwsClientBuilder.EndpointConfiguration("http://" + ipAddress + ":" + port, creds.getAwsRegion());
    }

    public void launch() {
        if (!wasInitialized) {
            if (!willIUseExternalizedContainer()) {
                image = new AWSServiceImage(getServiceImageName());

                configure();
                image.withFileSystemBind("//var/run/docker.sock", "/var/run/docker.sock");
                image.waitingFor(Wait.forLogMessage(".*" + getServiceStartMessage() + ".*", 1));

                if (!image.isRunning()) {
                    image.start();
                }

                Slf4jLogConsumer logConsumer = new Slf4jLogConsumer(log);
                image.followOutput(logConsumer);

            }
            wasInitialized = true;
        }
    }


}