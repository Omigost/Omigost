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
public class MainNotificationService implements NotificationService {
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

    public void sendMessageTo(User user, NotificationMessage message) {
        for (Communication communication : user.getCommunications()) {
            sendMessageTo(communication, message);
        }
    }

    public void sendMessageTo(Communication communication, NotificationMessage message) {
        communication.service().sendMessageTo(communication, message);
    }

        // TODO find admin of the resource by token
        // TODO notify admin with a nice message
    public void notifyOfLimitIncreaseRequest(AlertResponse request) {
    }
}

