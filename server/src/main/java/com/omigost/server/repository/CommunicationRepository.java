package com.omigost.server.repository;

import com.omigost.server.model.Communication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunicationRepository extends JpaRepository<Communication, Integer> {
    @Query(nativeQuery = true , value = "WITH  ")
    List<Communication> getCommunicationForAWSAccount(String accountId);
}
