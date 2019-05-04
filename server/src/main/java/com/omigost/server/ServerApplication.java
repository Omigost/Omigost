package com.omigost.server;

import com.omigost.server.aws.termination.ScheduledTerminationService;
import com.omigost.server.aws.termination.SlackCommunicationService;
import com.omigost.server.aws.termination.TokenEncryptingService;
import com.omigost.server.config.AWSLocalstackConfig;
import com.omigost.server.model.Account;
import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.model.User;
import com.omigost.server.repository.AccountRepository;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"com.omigost.server.repository"})
@EnableScheduling
@Service
public class ServerApplication {
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(ServerApplication.class);
        application.addInitializers(new AWSLocalstackConfig.Initializer());
        application.run(args);
    }


    @Autowired
    CommunicationRepository communicationRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SlackCommunicationService slackCommunicationService;
    @Autowired
    ScheduledTerminationService scheduledNotificationService;
    @Autowired
    TokenEncryptingService tokenEncryptingService;

    private final String testAwsId = "537952477028";
    private final String accountName = "Sumo2";
    private final String slackUserName = "Gor Safaryan";
    private final String username = "Gor";

    @PostConstruct
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
}
