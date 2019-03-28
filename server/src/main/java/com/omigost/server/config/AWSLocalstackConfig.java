package com.omigost.server.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.omigost.server.localstack.AWSContainer;

import com.omigost.server.localstack.MotoContainer;
import org.springframework.core.env.ConfigurableEnvironment;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.costexplorer.AWSCostExplorer;
import com.amazonaws.services.costexplorer.AWSCostExplorerClientBuilder;
import com.amazonaws.services.ec2.AmazonEC2;
import com.amazonaws.services.ec2.AmazonEC2ClientBuilder;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import com.amazonaws.services.organizations.AWSOrganizations;
import com.amazonaws.services.organizations.AWSOrganizationsClientBuilder;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.PropertyValues;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;

import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.StandardEnvironment;
import org.testcontainers.containers.PostgreSQLContainer;

@Configuration
@Slf4j
@Profile("dev")
public class AWSLocalstackConfig {

    private static AWSContainer awsContainer = new AWSContainer()
            .withServices(
                    AWSContainer.Service.API_GATEWAY,
                    AWSContainer.Service.SNS
            );

    private static MotoContainer motoContainer = new MotoContainer();

    private static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("postgres:10.4");

    private static void ensureLocalstackIsRunning() {
        if(!motoContainer.isRunning()) {
            motoContainer.start();
        }
        if (!awsContainer.isRunning()) {
            awsContainer.start();
        }
    }

    @Bean
    AWSCredentialsProvider credentials() {
        return awsContainer.getDefaultCredentialsProvider();
    }

    public static class Initializer
            implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {

            ensureLocalstackIsRunning();
            if(!postgreSQLContainer.isRunning()) {
                postgreSQLContainer.start();
            }

            ConfigurableEnvironment environment = new StandardEnvironment();
            Map<String, Object> overrideConfig = new HashMap<String, Object>() {{
                put("spring.datasource.url", postgreSQLContainer.getJdbcUrl());
                put("spring.datasource.username", postgreSQLContainer.getUsername());
                put("spring.datasource.password", postgreSQLContainer.getPassword());
            }};

            ConfigurableEnvironment env = configurableApplicationContext.getEnvironment();
            env.getPropertySources().addFirst(new MapPropertySource(this.getClass().getCanonicalName(), overrideConfig));
            configurableApplicationContext.setEnvironment(env);

            //throw new RuntimeException("Hello! |"+configurableApplicationContext.getEnvironment().getProperty("spring.datasource.url")+"|"+configurableApplicationContext.getEnvironment().getProperty("spring.datasource.username")+"|"+configurableApplicationContext.getEnvironment().getProperty("spring.datasource.password"));
        }
    }

    @Bean
    public AmazonIdentityManagement amazonIdentityManagement() {
        return AmazonIdentityManagementClientBuilder
                .standard()
                .withEndpointConfiguration(motoContainer.getEndpointConfiguration())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonEC2 amazonEc2() {
        return AmazonEC2ClientBuilder
                .standard()
                .withEndpointConfiguration(awsContainer.getEndpointConfiguration(AWSContainer.Service.API_GATEWAY))
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AWSCostExplorer awsCostExplorer() {
        return AWSCostExplorerClientBuilder
                .standard()
                .withEndpointConfiguration(awsContainer.getEndpointConfiguration(AWSContainer.Service.API_GATEWAY))
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AWSOrganizations awsOrganizations() {
        return AWSOrganizationsClientBuilder
                .standard()
                .withEndpointConfiguration(awsContainer.getEndpointConfiguration(AWSContainer.Service.API_GATEWAY))
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AWSBudgets awsBudgets() {
        return AWSBudgetsClientBuilder
                .standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
                        "http://students.mimuw.edu.pl:8099", "us-east-1"))
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonSNS amazonSns() {
        return AmazonSNSClientBuilder
                .standard()
                .withEndpointConfiguration(awsContainer.getEndpointConfiguration(AWSContainer.Service.SNS))
                .withCredentials(credentials())
                .build();
    }
}
