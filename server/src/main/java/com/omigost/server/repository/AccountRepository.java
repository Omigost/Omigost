package com.omigost.server.repository;

import com.omigost.server.model.Account;
import com.omigost.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    User getAccountByName(String name);
}

