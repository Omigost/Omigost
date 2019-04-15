package com.omigost.server.aws.termination;

import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.slack.SlackMessageAction;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.rest.dto.SlackResponse.Action;
import com.omigost.server.rest.dto.SlackResponse.SlackResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@Service
@RestController
@RequestMapping("/slackResponseHandler")
public class SlackCommunicationService {
    @Autowired
    TokenEncryptingService tokenEncryptingService;
    @Autowired
    CommunicationRepository communicationRepository;
    @Autowired
    SlackService slackService;

    @Autowired
    EC2TerminationService ec2TerminationService;

    private final String positiveActionValue = "yes";
    private final String negativeActionValue = "no";

    /**
     * returns the callback id for testing purposes
     */
    public String sendSlackReminder(String awsId, int instanceCount) {
        Collection<Communication> communications = communicationRepository.getCommunicationsForAWSId(awsId);
        String callbackId = tokenEncryptingService.encryptMessage(awsId);

        for (Communication communication : communications) {
            if (!communication.getType().equals(CommunicationType.SLACK)) continue;

            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .mainText("There are " + instanceCount + " EC2 instances running out of business hours.")
                    .mainText("Do you want me to stop them ?")
                    .action(new SlackMessageAction("ec2ResponseAction", "Yes", positiveActionValue))
                    .action(new SlackMessageAction("ec2ResponseAction", "No", negativeActionValue))
                    .build();

            slackService.sendAlertToUser(communication, notificationMessage, callbackId);
        }
        return callbackId;
    }

    @PostMapping
    public void slackResponseHandler(@RequestBody SlackResponseDTO responseDTO) {
        Action action = responseDTO.getActions().get(0);
        String callBackId = responseDTO.getCallback_id();
        String awsUserId = tokenEncryptingService.descryptMessage(callBackId);

        if (action.getValue().equals(positiveActionValue)) {
            ec2TerminationService.terminateRunningUserInsatnace(awsUserId);
        }

    }
}
