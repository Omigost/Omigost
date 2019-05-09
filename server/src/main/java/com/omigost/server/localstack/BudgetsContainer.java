package com.omigost.server.localstack;

import com.amazonaws.client.builder.AwsClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Component
public class BudgetsContainer extends AWSServiceImageContainer {

    @Value("${localstack.localAWSBudgets.image:}")
    private String imageName;

    @Value("${localstack.localAWSBudgets.port}")
    private int imagePort;

    @Value("${localstack.localAWSBudgets.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.localAWSBudgets.ip:localhost}")
    private String externalIP;

    @Override
    public String getServiceImageName() {
        return imageName;
    }

    @Override
    public String getServiceStartMessage() {
        return "Started ServerApplication";
    }

    @Override
    public int getServicePort() {
        return imagePort;
    }

    @Override
    public boolean willIUseExternalizedContainer() {
        return useExternal;
    }

    @Override
    public String getExternalServiceIP() {
        return externalIP;
    }

}