package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.model.Communication;
import com.omigost.server.aws.UserService;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MainNotificationService {
    @Autowired
    private AccountRepository accountRepository;

    public void alertBudgetTriggered(Budget budget) {
        NotificationMessage message = budgetTriggeredMessage(budget);
        sendBudgetAlert(budget, message);
    }

    private void sendBudgetAlert(Budget budget, NotificationMessage message) {
        for (Communication communication : getBudgetOwnersCommunications(budget)) {
            communication.service().sendAlertToUser(communication, message);
        }
    }

    private Set<Communication> getBudgetOwnersCommunications(Budget budget) {
        Set<Communication> result = new HashSet<>();

        for (String linkedAccount : budget.getCostFilters().get(BudgetDecorator.LINKED_ACCOUNT_FILTER)) {
            result.addAll(accountRepository.getAccountByName(linkedAccount).communications);
        }

        return result;
    }

    private NotificationMessage budgetTriggeredMessage(Budget budget) {
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
}

