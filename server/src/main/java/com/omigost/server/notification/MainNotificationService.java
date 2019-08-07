package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.MachineListingService;
import com.omigost.server.aws.MasterUserProvider;
import com.omigost.server.model.*;
import com.omigost.server.notification.message.MessageProvider;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MainNotificationService implements NotificationService {
    @Autowired
    MessageProvider messageProvider;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private MasterUserProvider masterUserProvider;

    @Autowired
    private SlackService slackService; /* extract mapping to a single ServiceProvider
                                       /  when too many services need to be included here */

    @Autowired
    private CommunicationRepository communicationRepository;

    @Autowired
    private MachineListingService machineListingService;

    public Set<Communication> globalBudgetCommunications() {
        return communicationRepository.getAll();
    }

    // TODO test if works
    private Set<Communication> budgetCommunicationsFromTagList(Map<String, List<String>> tagFilters) {
        Set<User> users = new HashSet<>();

        if (!tagFilters.isEmpty()) {
            for (Account account : accountRepository.getAll()) {
                accountRepository.getAll();
                if (machineListingService.accountHasMachinesWithTags(
                        masterUserProvider.getMasterUserId(), account, tagFilters
                )) {
                    users.addAll(account.getUsers());
                }
            }
        }

        return users.stream().map(User::getCommunications).flatMap(Set::stream).collect(Collectors.toSet());
    }

    private Set<Communication> budgetCommunicationsFromAccountIdentifiers(List<String> linkedAccounts) {
        Set<User> users = new HashSet<>();

        for (String linkedAccount : linkedAccounts) {
            users.addAll(accountRepository.getAccountByName(linkedAccount).getUsers());
        }

        return users.stream().map(User::getCommunications).flatMap(Set::stream).collect(Collectors.toSet());
    }

    public Map<String, List<String>> toTagFilterMap(List<String> tagFilterDescriptions) {
        Map<String, List<String>> results = new HashMap<>();
        for (String tagDescr : tagFilterDescriptions) {
            String[] tagComponents = tagDescr.split(":", 2);
            List<String> oldValues = results.getOrDefault(tagComponents[0], new ArrayList<>());
            oldValues.add(tagComponents[1]);

            results.put(tagComponents[0], oldValues);
        }
        return results;
    }

    public Set<Communication> getBudgetOwnersCommunications(Budget budget) {
        List<String> linkedAccounts = budget.getCostFilters().get(BudgetDecorator.LINKED_ACCOUNT_FILTER);
        Map<String, List<String>> tagFilters = toTagFilterMap(budget.getCostFilters().get(BudgetDecorator.TAG_FILTER));

        Set<Communication> result = new HashSet<>(globalBudgetCommunications());

        if (!linkedAccounts.isEmpty())
            result.retainAll(budgetCommunicationsFromAccountIdentifiers(linkedAccounts));
        if (!tagFilters.isEmpty())
            result.retainAll(budgetCommunicationsFromTagList(tagFilters));

        if (result.isEmpty()) result.addAll(
                masterUserProvider.omigostAdministratorUser().getCommunications()
        );

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

