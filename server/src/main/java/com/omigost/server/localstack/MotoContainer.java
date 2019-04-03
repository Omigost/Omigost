package com.omigost.server.localstack;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

public class MotoContainer extends AWSServiceImageContainer {

    private final Service service;

    public MotoContainer(final Service service) {
        super();
        this.service = service;
    }

    @Override
    public String getServiceImageName() {
        return "picadoh/motocker";
    }

    @Override
    public String getServiceStartMessage() {
        return "Running on";
    }

    @Override
    public int getServicePort() {
        return 5000;
    }

    @Override
    protected void configure() {
        super.configure();

        withEnv("MOTO_SERVICE", this.service.motoServiceName);
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
}