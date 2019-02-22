package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MainNotificationService {
    @Autowired
    private AccountRepository accountRepository;

    public Set<Communication> getBudgetOwnersCommunications(Budget budget) {
        Set<User> users = new HashSet<>();
        Set<Communication> result = new HashSet<>();
        List<String> linkedAccounts = budget.getCostFilters().get(BudgetDecorator.LINKED_ACCOUNT_FILTER);

        for (String linkedAccount : linkedAccounts) {
            users.addAll(accountRepository.getAccountByName(linkedAccount).users);
        }

        for (User user : users) {
            result.addAll(user.communications);
        }

        return result;
    }

    public NotificationMessage budgetTriggeredMessage(Budget budget) {
        if (new BudgetDecorator(budget).isOverrun())
            return budgetOverrunMessage(budget);
        return forecastedBudgetOverrunMessage(budget);
    }

    class RequestLimitIncreaseMessage extends NotificationMessage {
        RequestLimitIncreaseMessage(String mainText) {
            super(NotificationMessage.builder()
                    .mainText(mainText)
                    // TODO add request text field
                    .build()
            );
        }
    }

    private NotificationMessage forecastedBudgetOverrunMessage(Budget budget) {
        return new RequestLimitIncreaseMessage(String.format(
                "Budget %s is forecasted to exceed its %s limit.",
                budget.getBudgetName(),
                budget.getBudgetLimit().getAmount()
        ));
    }

    private NotificationMessage budgetOverrunMessage(Budget budget) {
        return new RequestLimitIncreaseMessage(String.format(
                "Budget %s has exceeded its %s limit.",
                budget.getBudgetName(),
                budget.getBudgetLimit().getAmount()
        ));
    }

    public void requestLimitIncrease(String requestBody) { // TODO there should be more parameters there to show a nicer message
        // TODO notify admin with a nice message
    }
}

