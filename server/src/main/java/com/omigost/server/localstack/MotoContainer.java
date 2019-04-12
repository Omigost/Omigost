package com.omigost.server.localstack;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MotoContainer extends AWSServiceImageContainer {

    private Service service;

    @Value("${localstack.motocker.image}")
    private String imageName;

    @Value("${localstack.motocker.port}")
    private int imagePort;

    private MotoContainer() {
        super();
        this.service = null;
    }

    @Bean
    public static MotoContainer motoIAM() {
        return new MotoContainer().setService(MotoContainer.Service.IAM);
    }

    @Bean
    public static MotoContainer motoOrganizations() {
        return new MotoContainer().setService(Service.ORGANIZATIONS);
    }

    @Bean
    public static MotoContainer motoEC2() {
        return new MotoContainer().setService(MotoContainer.Service.EC2);
    }

    public MotoContainer setService(Service service) {
        this.service = service;
        return this;
    }

    @Override
    public String getServiceImageName() {
        return imageName;
    }

    @Override
    public String getServiceStartMessage() {
        return "Running on";
    }

    @Override
    public int getServicePort() {
        return imagePort;
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