package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.budgets.model.Budget;
import com.amazonaws.services.budgets.model.CreateBudgetRequest;
import com.amazonaws.services.budgets.model.DeleteBudgetRequest;
import com.amazonaws.services.budgets.model.DescribeBudgetsRequest;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.CreateTopicRequest;
import com.amazonaws.services.sns.model.CreateTopicResult;
import com.amazonaws.services.sns.model.DeleteTopicRequest;
import com.amazonaws.services.sns.model.SubscribeRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class BudgetService {
    private static String BUDGET_NAME_PREFIX = "budget-";

    private AWSCredentialsProvider awsCredentials;
    private MasterUserProvider masterUserProvider;
    private AWSBudgets budgetsClient;
    private AmazonSNS snsClient;
    private String accountId;

    @Value("${aws.region}")
    private String region;
    @Value("${aws.budget.notifications.endpoint}")
    private String notificationsEndpoint;

    private AtomicInteger nextBudgetNumber;

    public BudgetService(AWSCredentialsProvider awsCredentials, MasterUserProvider masterUserProvider) {
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

        // Only to make smoke tests work without mocking everything
        if (!awsCredentials.getCredentials().getAWSAccessKeyId().equals("token")) {
            accountId = masterUserProvider.getMasterUserId();
            nextBudgetNumber = new AtomicInteger(getStartingNextBudgetNumber());
        }
    }

    public void createBudget(int limit, List<String> linkedAccounts, MultiValueMap<String, String> tags) {
        String budgetName = BUDGET_NAME_PREFIX + nextBudgetNumber.getAndIncrement();
        createSNSTopic(budgetName, false);

        CreateBudgetRequest createBudgetRequest = new NewBudgetRequestBuilder()
                .withLimit(limit)
                .withName(budgetName)
                .withLinkedAccountsFilter(linkedAccounts)
                .withTagsFilter(tags)
                .build();

        budgetsClient.createBudget(createBudgetRequest);
    }

    public void createBudget(int limit, List<String> linkedAccounts) {
        createBudget(limit, linkedAccounts, new LinkedMultiValueMap<>());
    }

    public void createBudget(int limit, MultiValueMap<String, String> tags) {
        createBudget(limit, new ArrayList<>(), tags);
    }

    public void createSeparateBudgets(int limit, List<String> accounts) {
        for (String accountId : accounts) {
            createBudget(limit, Arrays.asList(accountId));
        }
    }

    public void deleteBudget(String name) {
        budgetsClient.deleteBudget(new DeleteBudgetRequest().withBudgetName(name).withAccountId(accountId));
        snsClient.deleteTopic(new DeleteTopicRequest(getTopicArn(name)));
    }

    public List<Budget> getBudgets() {
        List<Budget> budgets = budgetsClient.describeBudgets(new DescribeBudgetsRequest().withAccountId(accountId)).getBudgets();
        if (budgets == null) return Collections.emptyList();
        return budgets;
    }

    private int getStartingNextBudgetNumber() {
        int currentMax = -1;

        for (Budget budget : getBudgets()) {
            if (!budget.getBudgetName().startsWith(BUDGET_NAME_PREFIX)) {
                continue;
            }

            String budgetNumber = budget.getBudgetName().substring(BUDGET_NAME_PREFIX.length());
            currentMax = Math.max(currentMax, Integer.parseInt(budgetNumber));
        }

        return currentMax + 1;
    }

    private void createSNSTopic(String name, boolean isHttps) {
        CreateTopicResult result = snsClient.createTopic(new CreateTopicRequest(name));
        snsClient.subscribe(new SubscribeRequest(result.getTopicArn(), isHttps ? "https" : "http", notificationsEndpoint));
    }

    private String getTopicArn(String topicName) {
        return "arn:aws:sns:" + region + ":" + accountId + ":" + topicName;
    }
}
