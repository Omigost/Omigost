package com.omigost.server.repository;

import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunicationRepository extends JpaRepository<Communication, Integer> {
    Communication getCommunicationByNameAndValueAndUser(String name, String value, User user);
}
