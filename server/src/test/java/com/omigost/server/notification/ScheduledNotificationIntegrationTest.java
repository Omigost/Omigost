package com.omigost.server.notification;

import com.omigost.server.ServerApplication;
import com.omigost.server.model.Communication;
import com.omigost.server.repository.CommunicationRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServerApplication.class)
public class ScheduledNotificationIntegrationTest {
    @Autowired
    CommunicationRepository communicationRepository;

    @Test
    public void initDb() {
        //TODO
        Set<Communication> communications = communicationRepository.getCommunicationsForAWSId("JoeAWSID");
        communications.size();
    }
}
