package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.MasterUserProvider;
import com.omigost.server.model.*;
import com.omigost.server.notification.message.LimitIncreaseRequestMessage;
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

    @Autowired
    private MasterUserProvider masterUserProvider;

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

    public void notifyOfLimitIncreaseRequest(AlertResponse request) {
        User applicant = request.getAlert().getCommunication().getUser();
        User admin = masterUserProvider.omigostAdministratorUser();
        LimitIncreaseRequestMessage message = new LimitIncreaseRequestMessage(applicant, request.getBody());
        sendMessageTo(admin, message);
    }
}

