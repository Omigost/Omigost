package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.budgets.model.*;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class BudgetService {
    private static String availableFilters = "[PurchaseType, TagKeyValue, UsageTypeGroup, Service, AZ, Region, " +
            "Operation, InstanceType, UsageType, BillingEntity, LinkedAccount]";

    private AWSCredentialsProvider awsCredentials;
    private MasterUserProvider masterUserProvider;
    private OrganizationService organization;
    private AWSBudgets budgetsClient;
    private AmazonSNS snsClient;

    @Value("${aws.region}")
    String region;

    private List<Budget> budgets = new ArrayList<>();
    private AtomicInteger nextBudget = new AtomicInteger(0);

    public BudgetService(AWSCredentialsProvider awsCredentials, MasterUserProvider masterUserProvider, OrganizationService organization) {
        this.awsCredentials = awsCredentials;
        this.masterUserProvider = masterUserProvider;

        budgetsClient = AWSBudgetsClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();

        snsClient = AmazonSNSClientBuilder.standard()
                .withCredentials(awsCredentials)
                .withRegion(region)
                .build();
    }

    public void setLimitForAll() {
        Spend spend = new Spend()
                .withUnit("USD")
                .withAmount(BigDecimal.valueOf(0.1));

        createBudget(spend);
    }

    public void createBudget(Spend s) {
        String budgetName = "budget-" + nextBudget.getAndIncrement();

        Budget budget = new Budget()
                .withBudgetLimit(s)
                .withBudgetName(budgetName)
                .withBudgetType(BudgetType.COST)
                .withTimeUnit(TimeUnit.MONTHLY);
        budget.addCostFiltersEntry("LinkedAccount", Arrays.asList("363407604673"));

        NotificationWithSubscribers notificationWithSubscribers = new NotificationWithSubscribers()
                .withSubscribers(new Subscriber()
                                .withSubscriptionType(SubscriptionType.EMAIL)
                                .withAddress("mi.oltarzewski@gmail.com"))
                .withNotification(new Notification()
                                .withNotificationType(NotificationType.ACTUAL)
                                .withThresholdType(ThresholdType.ABSOLUTE_VALUE)
                                .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                                .withThreshold(100.0));

        CreateBudgetRequest createBudgetRequest = new CreateBudgetRequest()
                .withBudget(budget)
                .withAccountId(masterUserProvider.getMasterUser().getUserId())
                .withNotificationsWithSubscribers(notificationWithSubscribers);

        budgetsClient.createBudget(createBudgetRequest);
    }
}
