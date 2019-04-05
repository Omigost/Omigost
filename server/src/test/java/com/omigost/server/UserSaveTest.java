package com.omigost.server;

import com.omigost.server.model.Communication;
import com.omigost.server.model.CommunicationType;
import com.omigost.server.model.User;
import com.omigost.server.repository.CommunicationRepository;
import com.omigost.server.repository.UserRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;


public class UserSaveTest extends ServerApplicationTestTemplate {
    @Autowired
    CommunicationRepository communicationRepository;
    @Autowired
    UserRepository userRepository;

    @Test
    public void runAppContextTest() {
        User u = new User();
        u.setName("Ken");

        Communication c = new Communication();
        c.setUser(u);
        c.setValue(CommunicationType.SLACK);
        c.setName("Ken");
        u.getCommunications().add(c);

        userRepository.save(u);
        communicationRepository.save(c);

        assertThat(userRepository.getUserByName("Ken"), is(u));

    }

}
