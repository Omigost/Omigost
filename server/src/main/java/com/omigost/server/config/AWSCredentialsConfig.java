package com.omigost.server.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Configuration
@Service
@Slf4j
public class AWSCredentialsConfig {
    @Value("${aws.nonRootAccessKey}")
    private String nonRootAccessKey;
    @Value("${aws.nonRootSecretKey}")
    private String nonRootSecretKey;

    @Getter
    private AWSCredentialsProvider nonRootCredentials;

    @Bean
    AWSCredentialsProvider credentials() {
        return new CustomAWSCredentialsProvider();
    }

    @PostConstruct
    void initializeNonRootCredentials() {
        nonRootCredentials = new AWSCredentialsProvider() {
            @Override
            public AWSCredentials getCredentials() {
                return new BasicAWSCredentials(nonRootAccessKey, nonRootSecretKey);
            }

            @Override
            public void refresh() {
            }
        };
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
        public void refresh() {
        }
    }
}
