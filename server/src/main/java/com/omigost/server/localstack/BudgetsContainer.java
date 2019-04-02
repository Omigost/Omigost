package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class BudgetsContainer extends GenericContainer<BudgetsContainer> {

    public BudgetsContainer() {
        super("styczynski/local-aws-budgets");

        withFileSystemBind("//var/run/docker.sock", "/var/run/docker.sock");
        waitingFor(Wait.forLogMessage(".*Started ServerApplication.*", 1));
    }

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
                //noinspection ResultOfMethodCallIgnored
                InetAddress.getAllByName(ipAddress);
                break;
            } catch (UnknownHostException ignored) {

            }
        }

        return new AwsClientBuilder.EndpointConfiguration(
                "http://" +
                        ipAddress +
                        ":" +
                        getMappedPort(5000), "us-east-1");
    }

    public AWSCredentialsProvider getDefaultCredentialsProvider() {
        return new AWSStaticCredentialsProvider(new BasicAWSCredentials("accesskey", "secretkey"));
    }
}