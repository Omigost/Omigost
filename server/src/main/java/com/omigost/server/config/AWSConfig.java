package com.omigost.server.config;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Slf4j
@Profile("default")
public class AWSConfig {

    @Autowired
    private AWSCredentials creds;

    @Bean
    AWSCredentialsProvider credentials() {
        return creds.getProvider();
    }

    @Bean
    public AmazonIdentityManagement amazonIdentityManagement() {
        return AmazonIdentityManagementClientBuilder
                .standard()
                .withRegion(creds.getAwsRegion())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonEC2 amazonEc2() {
        return AmazonEC2ClientBuilder.standard()
                .withCredentials(credentials())
                .withRegion(creds.getAwsRegion())
                .build();
    }

    @Bean
    public AWSCostExplorer awsCostExplorer() {
        return AWSCostExplorerClientBuilder
                .standard()
                .withCredentials(credentials())
                .withRegion(creds.getAwsRegion())
                .build();
    }

    @Bean
    public AWSOrganizations awsOrganizations() {
        return AWSOrganizationsClientBuilder
                .standard()
                .withCredentials(credentials())
                .withRegion(creds.getAwsRegion())
                .build();
    }

    @Bean
    public AWSBudgets awsBudgets() {
        return AWSBudgetsClientBuilder.standard()
                .withRegion(creds.getAwsRegion())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonSNS amazonSns() {
        return AmazonSNSClientBuilder.standard()
                .withCredentials(credentials())
                .withRegion(creds.getAwsRegion())
                .build();
    }

}
