package com.omigost.server;

import com.omigost.server.aws.termination.ScheduledNotificationService;
import com.omigost.server.aws.termination.SlackCommunicationService;
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
        SpringApplication.run(ServerApplication.class, args);
    }

}
