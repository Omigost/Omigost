package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.budgets.AWSBudgets;
import com.amazonaws.services.budgets.AWSBudgetsClient;
import com.amazonaws.services.budgets.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
class Budgets {
    @Autowired
    AWSCredentialsProvider awsCredentials;
    @Value("${aws-region}")
    String region;
    List<Budget> budgets = new ArrayList<>();

    private AWSBudgets budgetsClient = null;
//    AWSBudgetsClient
//            .builder()
//            .withCredentials(awsCredentials)
//            .withRegion(region)
//            .build();

    void addBudget() {
        Budget budget = new Budget();

        Spend s = new Spend();
        s.setAmount(BigDecimal.TEN);
        budget.setBudgetLimit(s);


        CreateBudgetRequest createBudgetRequest = new CreateBudgetRequest();
        createBudgetRequest.setBudget(budget);

        NotificationWithSubscribers notificationWithSubscribers = new NotificationWithSubscribers();
        notificationWithSubscribers.setSubscribers(Collections.singleton(new Subscriber()));
        Subscriber subscriber = new Subscriber();
        subscriber.setSubscriptionType(SubscriptionType.SNS);

//        createBudgetRequest.setNotificationsWithSubscribers();

        budgetsClient.createBudget(createBudgetRequest);

    }
}
