package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AWSConfig {

    @Bean
    AWSCredentialsProvider credentials() {
        return new CustomAWSCredentialsProvider();
    }


    private class CustomAWSCredentialsProvider implements AWSCredentialsProvider {
        @Value("${aws.accessKey}")
        private String AWSAccessKey;
        @Value("${aws.secretKey}")
        private String AWSSecretkey;

        @Override
        public AWSCredentials getCredentials() {
            return new BasicAWSCredentials(AWSAccessKey, AWSSecretkey);
        }

        @Override
        public void refresh() {}
    }
}
