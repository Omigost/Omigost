package com.omigost.server.localstack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MotoContainerIAM extends MotoContainer {

    @Value("${localstack.motocker.iam.image:}")
    private String imageName;

    @Value("${localstack.motocker.iam.port}")
    private int imagePort;

    @Value("${localstack.motocker.iam.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.motocker.iam.ip:localhost}")
    private String externalIP;

    public MotoContainerIAM() {
        super();
        setService(Service.IAM);
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