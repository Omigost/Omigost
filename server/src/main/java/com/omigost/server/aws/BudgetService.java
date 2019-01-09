package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.budgets.model.*;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClient;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.CreateTopicRequest;
import com.amazonaws.services.sns.model.CreateTopicResult;
import com.amazonaws.services.sns.model.DeleteTopicRequest;
import com.amazonaws.services.sns.model.SubscribeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class BudgetService {
    private static String AVAILABLE_COST_FILTERS = "[PurchaseType, TagKeyValue, UsageTypeGroup, Service, AZ, Region, " +
            "Operation, InstanceType, UsageType, BillingEntity, LinkedAccount]";
    private static String BUDGET_NAME_PREFIX = "budget-";

    private AWSCredentialsProvider awsCredentials;
    private MasterUserProvider masterUserProvider;
    private OrganizationService organization;
    private AWSBudgets budgetsClient;
    private AmazonSNS snsClient;
    private String accountId;

    @Value("${aws.region}")
    private String region;
    @Value("${aws.budget.notifications.endpoint}")
    private String notificationsEndpoint;

    private AtomicInteger nextBudgetNumber;

    public BudgetService(AWSCredentialsProvider awsCredentials, MasterUserProvider masterUserProvider, OrganizationService organization) {
        this.awsCredentials = awsCredentials;
        this.masterUserProvider = masterUserProvider;
    }

    @PostConstruct
    public void init() {
        budgetsClient = AWSBudgetsClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();

        snsClient = AmazonSNSClientBuilder.standard()
                .withCredentials(awsCredentials)
                .withRegion(region)
                .build();

        accountId = masterUserProvider.getMasterUserId();
        nextBudgetNumber = new AtomicInteger(getStartingNextBudgetNumber());
    }

    private int getStartingNextBudgetNumber() {
        int currentMax = -1;

        for (Budget budget : getBudgets()) {
            String budgetNumber = budget.getBudgetName().substring(BUDGET_NAME_PREFIX.length());
            currentMax = Math.max(currentMax, Integer.parseInt(budgetNumber));
        }

        return currentMax + 1;
    }

    public void setLimitForAll() {
        Spend spend = new Spend()
                .withUnit("USD")
                .withAmount(BigDecimal.valueOf(0.1));

        createBudget(spend);
    }

    public void createBudget(Spend s) {
        String budgetName = BUDGET_NAME_PREFIX + nextBudgetNumber.getAndIncrement();

        createSNSTopic(budgetName, false);

        Budget budget = new Budget()
                .withBudgetLimit(s)
                .withBudgetName(budgetName)
                .withBudgetType(BudgetType.COST)
                .withTimeUnit(TimeUnit.MONTHLY);
        budget.addCostFiltersEntry("LinkedAccount", Arrays.asList("363407604673"));

        // Not sure if "withAdress" takes name or arn of the SNS topic
        NotificationWithSubscribers notificationWithSubscribers = new NotificationWithSubscribers()
                .withSubscribers(new Subscriber()
                                .withSubscriptionType(SubscriptionType.SNS)
                                .withAddress(budgetName))
                .withNotification(new Notification()
                                .withNotificationType(NotificationType.ACTUAL)
                                .withThresholdType(ThresholdType.ABSOLUTE_VALUE)
                                .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                                .withThreshold(100.0));

        CreateBudgetRequest createBudgetRequest = new CreateBudgetRequest()
                .withBudget(budget)
                .withAccountId(accountId)
                .withNotificationsWithSubscribers(notificationWithSubscribers);

        budgetsClient.createBudget(createBudgetRequest);
    }

    public List<Budget> getBudgets() {
        return budgetsClient.describeBudgets(new DescribeBudgetsRequest().withAccountId(accountId)).getBudgets();
    }

    private void createSNSTopic(String name, boolean isHttps) {
        CreateTopicResult result = snsClient.createTopic(new CreateTopicRequest(name));
        snsClient.subscribe(new SubscribeRequest(result.getTopicArn(), isHttps ? "https" : "http", notificationsEndpoint));
    }

    private void deleteBudget(String name) {
        budgetsClient.deleteBudget(new DeleteBudgetRequest().withBudgetName(name).withAccountId(accountId));
        snsClient.deleteTopic(new DeleteTopicRequest(getTopicArn(name)));
    }

    private String getTopicArn(String topicName) {
        return "arn:aws:sns:" + region + ":" + accountId + ":" + topicName;
    }
}
