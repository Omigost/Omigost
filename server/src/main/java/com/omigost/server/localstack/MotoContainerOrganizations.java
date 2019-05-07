package com.omigost.server.localstack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MotoContainerOrganizations extends MotoContainer {

    @Value("${localstack.motocker.organizations.image:}")
    private String imageName;

    @Value("${localstack.motocker.organizations.port}")
    private int imagePort;

    @Value("${localstack.motocker.organizations.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.motocker.organizations.ip:localhost}")
    private String externalIP;

    public MotoContainerOrganizations() {
        super();
        setService(Service.ORGANIZATIONS);
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