package com.omigost.server.aws;

import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClientBuilder;
import com.amazonaws.services.budgets.model.*;
import com.amazonaws.services.organizations.model.Account;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.CreateTopicResult;
import com.amazonaws.services.sns.model.SubscribeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class Budgets {

    @Autowired
    AWSCredentialsProvider awsCredentials;
    @Value("${aws-region}")
    String region;
    List<Budget> budgets = new ArrayList<>();

    private AtomicInteger atomicInteger = new AtomicInteger(0);


    private AWSBudgets budgetsClient;
    private AmazonSNS snsClient;

    @PostConstruct
    void init() {
        budgetsClient = AWSBudgetsClientBuilder.standard()
                .withRegion(region)
                .withCredentials(awsCredentials)
                .build();

        snsClient = AmazonSNSClientBuilder.standard()
                .withCredentials(awsCredentials)
                .withRegion(region)
                .build();
    }


    @Autowired
    Organization organization;

    public void setLimitForAll() {
        Spend spend = new Spend();
        spend.setUnit("USD");

        spend.setAmount(BigDecimal.valueOf(0.1));
        setBudget(organization.getAccounts(), spend);
    }

    void setBudget(List<Account> accounts, Spend s) {
        for (Account account : accounts) {
            String budgetName = "budget-" + atomicInteger.getAndIncrement();

            Budget budget = new Budget();
            budget.setBudgetName(budgetName);
            budget.setBudgetLimit(s);
            budget.setBudgetType(BudgetType.COST);
            budget.setCostTypes(new CostTypes());


            //Map is empty
            Map<String, List<String>> costFilter = new HashMap<>();
            budget.setCostFilters(costFilter);
            budget.setTimeUnit(TimeUnit.DAILY);

            CreateTopicResult topic = snsClient.createTopic(budgetName);


            SubscribeRequest subscribeRequest = new SubscribeRequest();
            subscribeRequest.setProtocol(Protocol.HTTP.toString());
            subscribeRequest.setEndpoint("http://35.158.121.91:8000/");
            subscribeRequest.setTopicArn(topic.getTopicArn());

            snsClient.subscribe(subscribeRequest);


            NotificationWithSubscribers notificationWithSubscribers = new NotificationWithSubscribers();

            Subscriber subscriber = new Subscriber();
            subscriber.setSubscriptionType(SubscriptionType.SNS);
            subscriber.setAddress(topic.getTopicArn());



            notificationWithSubscribers.setSubscribers(Collections.singleton(subscriber));

            CreateBudgetRequest createBudgetRequest = new CreateBudgetRequest();
            createBudgetRequest.setBudget(budget);
            createBudgetRequest.setAccountId(account.getId());
            createBudgetRequest.setNotificationsWithSubscribers(Collections.singleton(notificationWithSubscribers));


            budgetsClient.createBudget(createBudgetRequest);

        }
    }

}
