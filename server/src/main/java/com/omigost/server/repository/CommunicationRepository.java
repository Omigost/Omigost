package com.omigost.server.repository;

import com.omigost.server.model.Communication;
import com.omigost.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Integer> {
    Communication getCommunicationByNameAndValueAndUser(String name, String value, User user);

    @Query("select c from Communication  c join c.user.accounts ac where ac.awsId=:id")
    Set<Communication> getCommunicationsForAWSId(@Param(value = "id") String id);
}

