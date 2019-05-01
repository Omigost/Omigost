package com.omigost.server.localstack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MotoContainerEC2 extends MotoContainer {

    @Value("${localstack.motocker.ec2.image:}")
    private String imageName;

    @Value("${localstack.motocker.ec2.port}")
    private int imagePort;

    @Value("${localstack.motocker.ec2.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.motocker.ec2.ip:localhost}")
    private String externalIP;

    public MotoContainerEC2() {
        super();
        setService(Service.EC2);
    }

    @Override
    public String getServiceImageName() {
        return imageName;
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