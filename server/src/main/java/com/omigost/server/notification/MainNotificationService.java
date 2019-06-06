package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.MasterUserProvider;
import com.omigost.server.model.*;
import com.omigost.server.notification.message.MessageProvider;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MainNotificationService implements NotificationService {
    @Autowired
    MessageProvider messageProvider;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MasterUserProvider masterUserProvider;

    @Autowired
    private SlackService slackService; // extract mapping to a single ServiceProvider
                                       // when too many services need to be included here

    @Autowired
    private CommunicationRepository communicationRepository;

    public Set<Communication> globalBudgetCommunications() {
        return communicationRepository.getAll();
    }

    private Set<Communication> budgetCommunicationsFromTagList(List<String> tagFilters) {
        Set<Communication> result = new HashSet<>();

        if (!tagFilters.isEmpty()) result.addAll(globalBudgetCommunications()); /* * TODO * */
        return result;
    }

    private Set<Communication> budgetCommunicationsFromAccountIdentifiers(List<String> linkedAccounts) {
        Set<User> users = new HashSet<>();
        Set<Communication> result = new HashSet<>();

        for (String linkedAccount : linkedAccounts) {
            users.addAll(accountRepository.getAccountByName(linkedAccount).getUsers());
        }

        for (User user : users) {
            result.addAll(user.getCommunications());
        }

        return result;
    }

    public Set<Communication> getBudgetOwnersCommunications(Budget budget) {
        List<String> linkedAccounts = budget.getCostFilters().get(BudgetDecorator.LINKED_ACCOUNT_FILTER);
        List<String> tagFilters = budget.getCostFilters().get(BudgetDecorator.TAG_FILTER);

        Set<Communication> result = new HashSet<>(globalBudgetCommunications());

        if (!linkedAccounts.isEmpty())
            result.retainAll(budgetCommunicationsFromAccountIdentifiers(linkedAccounts));
        if (!tagFilters.isEmpty())
            result.retainAll(budgetCommunicationsFromTagList(tagFilters));

        return result;
    }

    public void sendMessageTo(User user, NotificationMessage message) {
        for (Communication communication : user.getCommunications()) {
            sendMessageTo(communication, message);
        }
    }

    private NotificationService getCommunicationService(Communication communication) {
        switch (communication.getType()) {
            case CommunicationType.SLACK:
                return slackService;
            default:
                throw new RuntimeException("Communication type not supported!");
        }
    }

    public void sendMessageTo(Communication communication, NotificationMessage message) {
        getCommunicationService(communication)
                .sendMessageTo(communication, message);
    }

    public void notifyOfLimitIncreaseRequest(AlertResponse request) {
        User applicant = request.getAlert().getCommunication().getUser();
        User admin = masterUserProvider.omigostAdministratorUser();
        NotificationMessage message = messageProvider.limitIncreaseRequestMessage(applicant, request.getBody());
        sendMessageTo(admin, message);
    }
}

