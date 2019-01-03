package com.omigost.server.aws;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AWSConfig {

    @Bean
    AWSCredentialsProvider credentials() {
        try {
            EnvironmentVariableCredentialsProvider envCredentials = new EnvironmentVariableCredentialsProvider();
            envCredentials.getCredentials();//throws exceptions if variables not defined
            log.info("AWS from credentials from Environment variables");
            return envCredentials;
        } catch (SdkClientException ex) {
            log.warn("AWS credentials as environment variables are not set up");
        }
        PropertiesFileCredentialsProvider credentialsProvider = new PropertiesFileCredentialsProvider("./src/main/resources/application.properties");
        credentialsProvider.getCredentials();// throws exception if fields not defined
        log.info("AWS from properties");
        return credentialsProvider;
    }

}
