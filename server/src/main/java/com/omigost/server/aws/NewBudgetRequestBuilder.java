package com.omigost.server.aws;

import com.amazonaws.services.budgets.model.*;
import com.omigost.server.model.BudgetDecorator;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class NewBudgetRequestBuilder {
    private static String CURRENCY = "USD";

    private String name;
    private String snsAddress;
    private int limit;
    private List<String> linkedAccountsFilter = new ArrayList<>();
    private MultiValueMap<String, String> tagsFilter = new LinkedMultiValueMap<>();

    private String masterUserId;

    public NewBudgetRequestBuilder(String masterUserId) {
        this.masterUserId = masterUserId;
    }

    public NewBudgetRequestBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public NewBudgetRequestBuilder withSnsAddress(String snsAddress) {
        this.snsAddress = snsAddress;
        return this;
    }

    public NewBudgetRequestBuilder withLimit(int limit) {
        this.limit = limit;
        return this;
    }

    public NewBudgetRequestBuilder withLinkedAccountsFilter(List<String> linkedAccounts) {
        linkedAccountsFilter = linkedAccounts;
        return this;
    }

    public NewBudgetRequestBuilder withTagsFilter(MultiValueMap<String, String> tags) {
        tagsFilter = tags;
        return this;
    }

    public CreateBudgetRequest build() {
        Budget budget = new Budget()
                .withBudgetLimit(new Spend().withUnit(CURRENCY).withAmount(BigDecimal.valueOf(limit)))
                .withBudgetName(name)
                .withBudgetType(BudgetType.COST)
                .withTimeUnit(TimeUnit.MONTHLY);

        applyFilters(budget);

        return new CreateBudgetRequest()
                .withBudget(budget)
                .withAccountId(masterUserId)
                .withNotificationsWithSubscribers(getNotificationsWithSubscribers());
    }

    private void applyFilters(Budget budget) {
        new BudgetDecorator(budget)
                .setLinkedAccountsFilter(linkedAccountsFilter)
                .setTagsFilter(tagsFilter);
    }

    private Collection<NotificationWithSubscribers> getNotificationsWithSubscribers() {
        // Not sure if "withAdress" takes name or arn of the SNS topic
        List<NotificationWithSubscribers> result = new ArrayList<>();
        Subscriber snsSubscriber = new Subscriber()
                .withSubscriptionType(SubscriptionType.SNS)
                .withAddress(snsAddress);

        // Notification for surpassing limit
        result.add(new NotificationWithSubscribers()
                .withSubscribers(snsSubscriber)
                .withNotification(new Notification()
                        .withNotificationType(NotificationType.ACTUAL)
                        .withThresholdType(ThresholdType.PERCENTAGE)
                        .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                        .withThreshold(100.0)));
        // Notification for forecasted surpassing limit
        result.add(new NotificationWithSubscribers()
                .withSubscribers(snsSubscriber)
                .withNotification(new Notification()
                        .withNotificationType(NotificationType.FORECASTED)
                        .withThresholdType(ThresholdType.PERCENTAGE)
                        .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                        .withThreshold(100.0)));

        return result;
    }
}
