package com.omigost.server.notification.message;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationMessageLink;

public class BudgetTriggeredMessage extends NotificationMessage {
    private BudgetTriggeredMessage(NotificationMessage message) {
        super(message);
    }

    public BudgetTriggeredMessage(Budget budget, AlertResponseToken responseToken) {
        this(budget, responseToken.token);
    }

    public BudgetTriggeredMessage(Budget budget, String tokenString) {
        this(budgetTriggeredNotificationMessage(budget, tokenString));
    }

    private static NotificationMessage budgetTriggeredNotificationMessage(Budget budget, String tokenString) {
        String respondLinkUrl = "/requestBudgetLimit?token=" + tokenString; // TODO add host domain

        if (new BudgetDecorator(budget).isOverrun())
            return budgetOverrunMessage(budget, respondLinkUrl);
        return forecastedBudgetOverrunMessage(budget, respondLinkUrl);

    }

    private static NotificationMessage forecastedBudgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return NotificationMessage.builder()
            .mainText(String.format(
                    "Budget %s is forecasted to exceed its %s limit.",
                    budget.getBudgetName(),
                    budget.getBudgetLimit().getAmount()
            ))
            .link(new NotificationMessageLink("Request limit increase", respondLinkUrl))
            .build();
    }

    private static NotificationMessage budgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return NotificationMessage.builder()
            .mainText(String.format(
                    "Budget %s has exceeded its %s limit.",
                    budget.getBudgetName(),
                    budget.getBudgetLimit().getAmount()
            ))
            .link(new NotificationMessageLink("Request limit increase", respondLinkUrl))
            .build();
    }
}
