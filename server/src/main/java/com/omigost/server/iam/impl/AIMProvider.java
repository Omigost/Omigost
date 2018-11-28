package com.omigost.server.iam.impl;

import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIMProvider {
    @Value("aws-region")
    String region;
    @Bean
    AmazonIdentityManagement amazonIdentityManager() {
        return AmazonIdentityManagementClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new PropertiesFileCredentialsProvider("./src/main/resources/application.properties"))
                .build();
    }

}
