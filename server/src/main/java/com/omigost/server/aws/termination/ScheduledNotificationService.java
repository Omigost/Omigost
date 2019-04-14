package com.omigost.server.aws.termination;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.MachineListingService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.TokenEncryptingService;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.slack.SlackMessageAction;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.rest.dto.SlackResponse.Action;
import com.omigost.server.rest.dto.SlackResponse.SlackResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

/**
 * Terminates machines when running out of business hours
 */
@Service
@RestController
@RequestMapping("/slackResponseHandler")
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

    @Autowired
    TokenEncryptingService tokenEncryptingService;

    private final String positiveActionValue = "yes";
    private final String negativeActionValue = "no";

    //        @Scheduled(cron = "30 18-23/1,0-8/1 * * *")
    @Scheduled(cron = "1/1 * * * * ?")
    void notifyOutOfBusinessHours() {
        List<Account> accountList = organizationService.fetchAccounts();
        for (Account account : accountList) {
            if (!account.getEmail().contains("test")) {
                continue;
            }
            List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(account.getId());
            if (runningEC2Instances.size() > 0) {
                sendSlackReminder(account, runningEC2Instances.size());
            }
        }
    }

    void sendSlackReminder(Account account, int instanceCount) {
        Collection<Communication> communications = communicationRepository.getCommunicationsForAWSId(account.getId());
        String callbackId = tokenEncryptingService.encryptMessage(account.getId());

        for (Communication communication : communications) {
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .mainText("There are " + instanceCount + " EC2 instances running out of business hours.")
                    .mainText("Do you want me to stop them ?")
                    .action(new SlackMessageAction("ec2ResponseAction", "Yes", positiveActionValue))
                    .action(new SlackMessageAction("ec2ResponseAction", "No", negativeActionValue))
                    .build();

            slackService.sendAlertToUser(communication, notificationMessage, callbackId);
        }
    }

    private void terminateRunningUserInsatnace(String awsUserId) {
        List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(awsUserId);
        ec2TerminationService.terminate(runningEC2Instances, awsUserId);
    }

    @PostMapping
    private void slackRespnonseHandler(@RequestBody SlackResponseDTO responseDTO) {
        Action action = responseDTO.getActions().get(0);
        String callBackId = responseDTO.getCallback_id();
        String awsUserId = tokenEncryptingService.descryptMessage(callBackId);

        if (action.getValue().equals(positiveActionValue)) {
            terminateRunningUserInsatnace(awsUserId);
        }

    }
}
