package com.omigost.server.scheduledTermination;

import com.omigost.server.aws.termination.ScheduledNotificationService;
import com.omigost.server.aws.termination.SlackCommunicationService;
import com.omigost.server.aws.termination.TokenEncryptingService;
import com.omigost.server.model.Account;
import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import com.omigost.server.rest.dto.SlackResponse.SlackResponseDTO;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;


public class ScheduledNotificationIntegrationTest extends TestTemplate {
    @Autowired
    CommunicationRepository communicationRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SlackCommunicationService slackCommunicationService;
    @Autowired
    ScheduledNotificationService scheduledNotificationService;
    @Autowired
    TokenEncryptingService tokenEncryptingService;

    private final String testAwsId = "537952477028";
    private final String accountName = "Sumo2";
    private final String slackUserName = "Gor Safaryan";
    private final String username = "Gor";

    void initDB() {
        Communication communication = new Communication();
        communication.setValue(slackUserName);
        communication.setType(CommunicationType.SLACK);
        communicationRepository.save(communication);

        Account account = new Account();
        account.setName(accountName);
        account.setAwsId(testAwsId);
        account.setScheduledNotification(true);
        accountRepository.save(account);

        User user = new User();
        user.setName(username);
        userRepository.save(user);

        communication.setUser(user);
        user.setCommunications(Collections.singleton(communication));
        account.setUsers(Collections.singleton(user));

        accountRepository.save(account);
        userRepository.save(user);
        communicationRepository.save(communication);
    }

    void communicationRepositoryTest() {
        Set<Communication> communicationCollections = communicationRepository.getCommunicationsForAWSId(testAwsId);
        assertThat(communicationCollections.size(), is(1));
        List<Communication> communicationList = new ArrayList<>(communicationCollections);
        assertThat(communicationList.get(0).getValue(), is(slackUserName));
    }

    void slackNotificationTest() {
        scheduledNotificationService.notifyOutOfBusinessHours();
    }

    void slackResponseTest() {
        //just to get the callbackId
        //side effect is that 2 messages are sent
        String callbackId = slackCommunicationService.sendSlackReminder(testAwsId, -1);
        assertThat(testAwsId,is(tokenEncryptingService.descryptMessage(callbackId)));
        SlackResponseDTO slackResponseDTO = new SlackResponseDTO();
        slackResponseDTO.setCallback_id(callbackId);
    }

    @Test
    public void integrationTest() {
        initDB();
        communicationRepositoryTest();
        slackNotificationTest();
        slackResponseTest();
    }

}
