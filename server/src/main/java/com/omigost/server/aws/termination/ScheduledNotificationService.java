package com.omigost.server.aws.termination;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.MachineListingService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.slack.SlackMessageAction;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Terminates machines when running out of business hours
 */
@Service
public class ScheduledNotificationService {
    @Autowired
    EC2TerminationService ec2TerminationService;

    @Autowired
    MachineListingService machineListingService;

    @Autowired
    OrganizationService organizationService;

    @Autowired
    SlackService slackService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CommunicationRepository communicationRepository;

    //        @Scheduled(cron = "30 18-23/1,0-8/1 * * *")
    @Scheduled(cron = "1/1 * * * * ?")
    void notifyOutOfBusinessHours() {
        List<Account> accountList = organizationService.fetchAccounts();
        for (Account account : accountList) {
            if(!account.getEmail().contains("test")) continue;
            List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(account.getId());
            if (runningEC2Instances.size() > 0) sendSlackReminder(account, runningEC2Instances.size());
        }
    }

    void sendSlackReminder(Account account, int instanceCount) {
        Collection<Communication> communications = communicationRepository.getCommunicationsForAWSId(account.getId());
        for (Communication communication : communications) {
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .mainText("There are " + instanceCount + " EC2 instances running out of business hours.")
                    .mainText("Do you want me to stop them ?")
                    .action(new SlackMessageAction("ec2ResponseAction", "Yes", "yes"))
                    .action(new SlackMessageAction("ec2ResponseAction", "No", "no"))
                    .build();
            slackService.sendAlertToUser(communication, notificationMessage);
        }
    }

}
