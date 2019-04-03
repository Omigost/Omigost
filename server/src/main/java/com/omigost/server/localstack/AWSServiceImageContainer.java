package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.net.InetAddress;
import java.net.UnknownHostException;

public abstract class AWSServiceImageContainer extends GenericContainer<BudgetsContainer> {


    public AWSServiceImageContainer() {
        super();

        this.setDockerImageName(getServiceImageName());

        withFileSystemBind("//var/run/docker.sock", "/var/run/docker.sock");
        waitingFor(Wait.forLogMessage(".*" + getServiceStartMessage() + ".*", 1));
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
        } catch (UnknownHostException ignored) {

        }
        ipAddress = ipAddress + ".nip.io";
        while (true) {
            try {
                InetAddress.getAllByName(ipAddress);
                break;
            } catch (UnknownHostException ignored) {

            }
        }

        return new AwsClientBuilder.EndpointConfiguration(
                "http://" +
                        ipAddress +
                        ":" +
                        getMappedPort(getServicePort()), "us-east-1");
    }

    public AWSCredentialsProvider getDefaultCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials("accesskey", "secretkey"));
    }
}