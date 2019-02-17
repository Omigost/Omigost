package com.omigost.server.aws;

import com.amazonaws.services.budgets.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class NewBudgetRequestBuilder {
    private static String CURRENCY = "USD";
    private static String LINKED_ACCOUNT_FILTER = "LinkedAccount";
    private static String TAG_FILTER = "TagKeyValue";

    private String name;
    private int limit;
    private List<String> linkedAccountsFilter = new ArrayList<>();
    private MultiValueMap<String, String> tagsFilter = new LinkedMultiValueMap<>();

    @Autowired
    private MasterUserProvider masterUserProvider;

    public NewBudgetRequestBuilder withName(String name) {
        this.name = name;
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
                .withAccountId(masterUserProvider.getMasterUserId())
                .withNotificationsWithSubscribers(getNotificationsWithSubscribers());
    }

    private void applyFilters(Budget budget) {
        budget.addCostFiltersEntry(LINKED_ACCOUNT_FILTER, linkedAccountsFilter);

        ArrayList<String> tagsFilterList = new ArrayList<>();
        tagsFilter.entrySet().forEach(entry -> {
            for (String tagValue : entry.getValue()) {
                tagsFilterList.add(entry.getKey() + "$" + tagValue);
            }
        });
        budget.addCostFiltersEntry(TAG_FILTER, tagsFilterList);
    }

    private Collection<NotificationWithSubscribers> getNotificationsWithSubscribers() {
        // Not sure if "withAdress" takes name or arn of the SNS topic
        List<NotificationWithSubscribers> result = new ArrayList<>();
        Subscriber snsTopic = new Subscriber()
                .withSubscriptionType(SubscriptionType.SNS)
                .withAddress(name);

        // Notification for surpassing limit
        result.add(new NotificationWithSubscribers()
                .withSubscribers(snsTopic)
                .withNotification(new Notification()
                        .withNotificationType(NotificationType.ACTUAL)
                        .withThresholdType(ThresholdType.PERCENTAGE)
                        .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                        .withThreshold(100.0)));
        // Notification for forecasted surpassing limit
        result.add(new NotificationWithSubscribers()
                .withSubscribers(snsTopic)
                .withNotification(new Notification()
                        .withNotificationType(NotificationType.FORECASTED)
                        .withThresholdType(ThresholdType.PERCENTAGE)
                        .withComparisonOperator(ComparisonOperator.GREATER_THAN)
                        .withThreshold(100.0)));

        return result;
    }
}
