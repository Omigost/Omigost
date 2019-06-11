package com.omigost.server.notification.message;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.model.User;
import com.omigost.server.notification.MessageLinkProvider;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationMessageLink;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageProvider {
    @Autowired
    MessageLinkProvider linksProvider;

    public NotificationMessage limitIncreaseRequestMessage(User applicant, String requestBody) {
        return NotificationMessage.builder()
                .mainText(String.format(
                        "User %s (id: %s) requested a limit increase.\nReason:\"%s\"\n",
                        applicant.getName(),
                        applicant.getId().toString(),
                        requestBody
                ))
                .link(linksProvider.frontendLink("Manage budgets", "home/users-view"))
                .build();
    }

    public NotificationMessage budgetTriggeredMessage(Budget budget, AlertResponseToken responseToken) {
        return budgetTriggeredMessage(budget, responseToken.token);
    }

    public NotificationMessage budgetTriggeredMessage(Budget budget, String tokenString) {
        return new NotificationMessage(budgetTriggeredNotificationMessage(budget, tokenString));
    }

    private NotificationMessage budgetTriggeredNotificationMessage(Budget budget, String tokenString) {
        String respondLinkUrl = "requestBudgetLimit?token=" + tokenString;

        if (new BudgetDecorator(budget).isOverrun())
            return budgetOverrunMessage(budget, respondLinkUrl);
        return forecastedBudgetOverrunMessage(budget, respondLinkUrl);

    }

    private NotificationMessage forecastedBudgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return NotificationMessage.builder()
                .mainText(String.format(
                        "Budget %s is forecasted to exceed its %s limit.",
                        budget.getBudgetName(),
                        budget.getBudgetLimit().getAmount()
                ))
                .link(linksProvider.frontendLink("Request limit increase", respondLinkUrl))
                .build();
    }

    private NotificationMessage budgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return NotificationMessage.builder()
                .mainText(String.format(
                        "Budget %s has exceeded its %s limit.",
                        budget.getBudgetName(),
                        budget.getBudgetLimit().getAmount()
                ))
                .link(linksProvider.frontendLink("Request limit increase", respondLinkUrl))
                .build();
    }
}
