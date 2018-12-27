package com.omigost.server.aws;

import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {
    @Bean
    PropertiesFileCredentialsProvider credentials() {
        return new PropertiesFileCredentialsProvider("./src/main/resources/application.properties");
    }
}
