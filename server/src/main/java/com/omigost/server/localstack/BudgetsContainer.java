package com.omigost.server.localstack;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.omigost.server.config.AWSCredentials;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Component
@Slf4j
public class BudgetsContainer extends AWSServiceImageContainer {

    @Value("${localstack.localAWSBudgets.image:}")
    private String imageName;

    @Value("${localstack.localAWSBudgets.port}")
    private int imagePort;

    @Value("${localstack.localAWSBudgets.useExternal:false}")
    private boolean useExternal;

    @Value("${localstack.localAWSBudgets.ip:localhost}")
    private String externalIP;

    @Autowired
    AWSCredentials awsCredentials;

    @Setter
    @Getter
    private String awsSnsIP = "localhost";

    @Setter
    @Getter
    private int awsSnsPort = 4575;

    @Override
    public void launch() {
        log.info("Launching budgets with sns.ip="+awsSnsIP+" and sns.port="+awsSnsPort);
        log.info("Budgets will start on port "+externalIP+":"+imagePort+" (external = "+useExternal+")");
        super.launch();
    }

    @Override
    public void configure() {
        getImage()
            .withEnv("AWS_REGION", awsCredentials.getAwsRegion())
            .withEnv("AWS_ACCESS_KEY", awsCredentials.getAccessKey())
            .withEnv("AWS_SECRET_KEY", awsCredentials.getSecretKey())
            .withEnv("AWS_SNS_IP", awsSnsIP)
            .withEnv("AWS_SNS_PORT", ((Object) awsSnsPort).toString());
    }

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