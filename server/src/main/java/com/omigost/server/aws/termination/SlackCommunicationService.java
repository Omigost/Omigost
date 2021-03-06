package com.omigost.server.aws.termination;

import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.slack.SlackMessageAction;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.rest.dto.SlackResponse.Action;
import com.omigost.server.rest.dto.SlackResponse.SlackResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Service
@Slf4j
public class SlackCommunicationService {
    @Autowired
    private CommunicationRepository communicationRepository;
    @Autowired
    private SlackService slackService;
    @Autowired
    private EC2TerminationService ec2TerminationService;
    @Autowired
    private TerminationTokenService terminationTokenService;
    @Value("${communication.remind.period}")
    long remindPeriod;

    /**
     * returns the callback id for testing purposes
     */
    public String sendSlackReminder(String awsId, int instanceCount) {
        Collection<Communication> communications = communicationRepository.getCommunicationsForAWSId(awsId);
        String callbackId = terminationTokenService.serializeToken(awsId);
        long currentTimestamp = System.currentTimeMillis() / 1000;
        for (Communication communication : communications) {
            if (!communication.getType().equals(CommunicationType.SLACK)) continue;

            long timeAfterLastReminder = currentTimestamp - communication.getLastMessageTimestamp();
            timeAfterLastReminder = timeAfterLastReminder / (60 * 60); //convert to hours
            if (remindPeriod > timeAfterLastReminder) continue;

            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .mainText("There are " + instanceCount + " EC2 instances running out of business hours.")
                    .attachmentText("What should I do?")
                    .action(new SlackMessageAction("ec2ResponseAction", InstanceActions.leaveThemAlone, InstanceActions.leaveThemAlone))
                    .action(new SlackMessageAction("ec2ResponseAction", InstanceActions.stop, InstanceActions.stop))
                    .action(new SlackMessageAction("ec2ResponseAction", InstanceActions.terminate, InstanceActions.terminate))
                    .build();

            slackService.sendAlertToUser(communication, notificationMessage, callbackId);
            communication.setLastMessageTimestamp(currentTimestamp);
            communicationRepository.save(communication);

            log.info("sent message via slack for ec2s working in account " + awsId);
        }
        return callbackId;
    }

    public String slackResponseHandler(SlackResponseDTO responseDTO) {
        Action action = responseDTO.getActions().get(0);
        String callBackId = responseDTO.getCallback_id();
        Optional<String> awsUserId = terminationTokenService.deserializeToken(callBackId);
        return awsUserId.map(s -> processInstanceAction(action.getValue(), s)).orElse("I am sorry, but the message token has timed out. :(");
    }

    private String processInstanceAction(String action, String awsId) {
        if (InstanceActions.stop.equals(action)) {
            ec2TerminationService.stopRunningInstances(awsId);
            log.info("stopped ec2 instances for account " + awsId);

        }
        if (InstanceActions.terminate.equals(action)) {
            ec2TerminationService.terminateRunningInstances(awsId);
            log.info("terminated ec2 instances for account " + awsId);
        }
        if (InstanceActions.leaveThemAlone.equals(action)) {
            //TODO stop asking the user for termination
        }
        return "Done!";
    }

}