package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.BudgetDecorator;
import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MainNotificationService {
    @Autowired
    private AccountRepository accountRepository;

    public void alertBudgetOverran(Budget budget) {
        NotificationMessage message = budgetOverranMessage(budget);
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
            for (User user : accountRepository.getAccountByName(linkedAccount).getUsers()) {
                result.addAll(user.getCommunications());
            }
        }

        return result;
    }

    private NotificationMessage budgetOverranMessage(Budget budget) {
        return NotificationMessage.builder()
                .mainText("TODO this message should have sth meaningful")
                .build();
    }
}

