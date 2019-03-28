package com.omigost.server.notification;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.budgets.model.*;
import com.omigost.server.aws.NewBudgetRequestBuilder;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Objects;

public class ExperimentTest {
    @Test
    public void exampleNotificationMessageBuilds() {
        final AWSBudgets budgetsClient = AWSBudgetsClientBuilder
                .standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(
                        "http://students.mimuw.edu.pl:8099", "us-east-1"))
                .withCredentials(new AWSCredentialsProvider() {
                    @Override
                    public AWSCredentials getCredentials() {
                        return new BasicAWSCredentials("AWSAccessKey", "AWSSecretkey");
                    }
                    @Override
                    public void refresh() {
                    }
                })
                .build();

        budgetsClient.createBudget(
                new CreateBudgetRequest()
                        .withBudget(new Budget()
                                .withBudgetLimit(new Spend().withUnit("USD").withAmount(BigDecimal.valueOf(100)))
                                .withBudgetName("BudgetName"))
                        .withAccountId("12345")
        );

        budgetsClient.describeBudgets(
                new DescribeBudgetsRequest()
                        .withAccountId("12345")
        );

        budgetsClient.describeBudget(
                new DescribeBudgetRequest()
                    .withBudgetName("BudgetName")
                    .withAccountId("12345")
        );

        budgetsClient.deleteBudget(
                new DeleteBudgetRequest()
                    .withAccountId("12345")
                    .withBudgetName("BudgetName")
        );
    }
}
