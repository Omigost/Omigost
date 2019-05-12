package com.omigost.server.scheduledTermination;

import com.omigost.server.DevConfigTestTemplate;
import com.omigost.server.aws.termination.ScheduledTerminationService;
import com.omigost.server.aws.termination.SlackCommunicationService;
import com.omigost.server.aws.termination.TokenEncryptingService;
import com.omigost.server.model.Account;
import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;


public class ScheduledNotificationTest extends DevConfigTestTemplate {
    @Autowired
    CommunicationRepository communicationRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SlackCommunicationService slackCommunicationService;
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

    void communicationRepositoryTestCase() {
        Set<Communication> communicationCollections = communicationRepository.getCommunicationsForAWSId(testAwsId);
        assertThat(communicationCollections.size(), is(1));
        List<Communication> communicationList = new ArrayList<>(communicationCollections);
        assertThat(communicationList.get(0).getValue(), is(slackUserName));
    }

    @Test
    public void tokenEncryptionTest() {
        final String testString = "Encrypt me if you can.";
        String encrypted = tokenEncryptingService.encryptMessage(testString);
        String decrypted = tokenEncryptingService.descryptMessage(encrypted);
        assertThat(testString, is(decrypted));
    }

    @Test
    public void communicationRepositoryTest() {
        initDB();
        communicationRepositoryTestCase();
    }


}
