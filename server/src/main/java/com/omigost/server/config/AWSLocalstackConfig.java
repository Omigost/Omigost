package com.omigost.server.config;

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
import com.omigost.server.localstack.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.stream.Collectors;

@Configuration
@Component
@Slf4j
@Profile("dev")
public class AWSLocalstackConfig {

    @Value("${aws.region}")
    private String region;

    @Value("${aws.accessKey}")
    private String AWSAccessKey;

    @Value("${aws.secretKey}")
    private String AWSSecretkey;

    private static PostgresContainer postgresContainer;
    @Autowired
    private LocalstackContainer awsContainer;
    @Autowired
    private MotoContainer motoIAM;
    @Autowired
    private MotoContainer motoOrganizations;
    @Autowired
    private MotoContainer motoEC2;
    @Autowired
    private BudgetsContainer budgetsContainer;

    private void ensureLocalstackIsRunning() {
        List<ImageContainer> c = new ArrayList<ImageContainer>() {{
            add(budgetsContainer);
            add(motoEC2);
            add(motoIAM);
            add(awsContainer);
            add(motoOrganizations);
        }};

        ForkJoinPool pool = new ForkJoinPool(4);
        try {
            pool.submit(
                    () -> c.parallelStream().map(image -> {
                        image.launch();
                        return 1;
                    }).collect(Collectors.toList())
            ).get();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Could not setup all containers", e);
        }
    }

    @Bean
    AWSCredentialsProvider credentials() {
        return awsContainer.getCredentailsProvider();
    }

    @Bean
    public AmazonIdentityManagement amazonIdentityManagement() {
        ensureLocalstackIsRunning();
        return AmazonIdentityManagementClientBuilder
                .standard()
                .withEndpointConfiguration(motoIAM.getEndpointConfiguration())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonEC2 amazonEc2() {
        ensureLocalstackIsRunning();
        return AmazonEC2ClientBuilder
                .standard()
                .withEndpointConfiguration(motoEC2.getEndpointConfiguration())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AWSCostExplorer awsCostExplorer() {
        return AWSCostExplorerClientBuilder
                .standard()
                .withCredentials(new AWSCredentialsProvider() {
                    @Override
                    public AWSCredentials getCredentials() {
                        return new BasicAWSCredentials(AWSAccessKey, AWSSecretkey);
                    }

                    @Override
                    public void refresh() {
                    }
                })
                .withRegion(region)
                .build();
    }

    @Bean
    public AWSOrganizations awsOrganizations() {
        ensureLocalstackIsRunning();
        return AWSOrganizationsClientBuilder
                .standard()
                .withEndpointConfiguration(motoOrganizations.getEndpointConfiguration())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AWSBudgets awsBudgets() {
        ensureLocalstackIsRunning();
        return AWSBudgetsClientBuilder
                .standard()
                .withEndpointConfiguration(budgetsContainer.getEndpointConfiguration())
                .withCredentials(credentials())
                .build();
    }

    @Bean
    public AmazonSNS amazonSns() {
        ensureLocalstackIsRunning();
        return AmazonSNSClientBuilder
                .standard()
                .withEndpointConfiguration(awsContainer.getEndpointSNS())
                .withCredentials(credentials())
                .build();
    }

    public static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            final String imageName = configurableApplicationContext.getEnvironment().getProperty("localstack.postgres.image");
            postgresContainer = new PostgresContainer(imageName);
            postgresContainer.initialize(configurableApplicationContext);
        }
    }
}
