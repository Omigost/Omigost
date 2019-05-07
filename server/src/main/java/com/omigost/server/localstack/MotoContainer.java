package com.omigost.server.localstack;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

public abstract class MotoContainer extends AWSServiceImageContainer {

    private Service service;

    public MotoContainer() {
        super();
        this.service = null;
    }

    public MotoContainer setService(Service service) {
        this.service = service;
        return this;
    }

    @Override
    public String getServiceStartMessage() {
        return "Running on";
    }

    @Override
    public void configure() {
        getImage().withEnv("MOTO_SERVICE", this.service.motoServiceName);
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