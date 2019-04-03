package com.omigost.server.localstack;

public class BudgetsContainer extends AWSServiceImageContainer {

    @Override
    public String getServiceImageName() {
        return "styczynski/local-aws-budgets";
    }

    @Override
    public String getServiceStartMessage() {
        return "Started ServerApplication";
    }

    @Override
    public int getServicePort() {
        return 5000;
    }
}