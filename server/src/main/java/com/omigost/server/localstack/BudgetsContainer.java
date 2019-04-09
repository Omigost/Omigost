package com.omigost.server.localstack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BudgetsContainer extends AWSServiceImageContainer {

    @Value("${localstack.localAWSBudgets.image}")
    private String imageName;

    @Value("${localstack.localAWSBudgets.port}")
    private int imagePort;

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

}