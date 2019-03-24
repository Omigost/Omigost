package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MainNotificationService {
    @Autowired
    private AccountRepository accountRepository;

    public Set<Communication> getBudgetOwnersCommunications(Budget budget) {
        Set<User> users = new HashSet<>();
        Set<Communication> result = new HashSet<>();
        List<String> linkedAccounts = budget.getCostFilters().get(BudgetDecorator.LINKED_ACCOUNT_FILTER);

        for (String linkedAccount : linkedAccounts) {
            users.addAll(accountRepository.getAccountByName(linkedAccount).getUsers());
        }

        for (User user : users) {
            result.addAll(user.getCommunications());
        }

        return result;
    }

    public NotificationMessage budgetTriggeredMessage(Budget budget, AlertResponseToken responseToken) {
        return budgetTriggeredMessage(budget, responseToken.token);
    }

    public NotificationMessage budgetTriggeredMessage(Budget budget, String tokenString) {
        String respondLinkUrl = "/alerts/trigger?token=" + tokenString; // TODO add host domain

        if (new BudgetDecorator(budget).isOverrun())
            return budgetOverrunMessage(budget, respondLinkUrl);
        return forecastedBudgetOverrunMessage(budget, respondLinkUrl);
    }

    class RequestLimitIncreaseMessage extends NotificationMessage {
        RequestLimitIncreaseMessage(String mainText, String respondLinkUrl) {
            super(NotificationMessage.builder()
                    .mainText(mainText)
                    .link(new NotificationMessageLink("Request limit increase", respondLinkUrl))
                    .build()
            );
        }
    }

    private NotificationMessage forecastedBudgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return new RequestLimitIncreaseMessage(String.format(
                "Budget %s is forecasted to exceed its %s limit.",
                budget.getBudgetName(),
                budget.getBudgetLimit().getAmount()
        ), respondLinkUrl);
    }

    private NotificationMessage budgetOverrunMessage(Budget budget, String respondLinkUrl) {
        return new RequestLimitIncreaseMessage(String.format(
                "Budget %s has exceeded its %s limit.",
                budget.getBudgetName(),
                budget.getBudgetLimit().getAmount()
        ), respondLinkUrl);
    }

    public void requestLimitIncrease(String requestBody, AlertResponseToken token) {
        // TODO find admin of the resource by token
        // TODO notify admin with a nice message
    }
}

