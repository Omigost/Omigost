package com.omigost.server.localstack;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.rnorth.ducttape.Preconditions;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class MotoContainer extends GenericContainer<MotoContainer> {

    public static final String VERSION = "0.9.0";

    private final Service service;

    public MotoContainer(final Service service) {
        this(service, VERSION);
    }

    public MotoContainer(final Service service, final String version) {
        super("picadoh/motocker");

        this.service = service;

        withFileSystemBind("//var/run/docker.sock", "/var/run/docker.sock");
        waitingFor(Wait.forLogMessage(".*Running on.*", 1));
    }

    @RequiredArgsConstructor
    @Getter
    @FieldDefaults(makeFinal = true)
    public enum Service {
        IAM("iam"),
        ORGANIZATIONS("organizations"),
        EC2("ec2");

        String motoServiceName;
    }

    @Override
    protected void configure() {
        super.configure();

        withEnv("MOTO_SERVICE", this.service.motoServiceName);
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