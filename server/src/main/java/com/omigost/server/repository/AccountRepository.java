package com.omigost.server.repository;

import com.omigost.server.model.Account;
import com.omigost.server.model.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    User getAccountByName(String name);

    default Account getOrCreate(String name) {
        Account account = new Account();
        account.name = name;

        Optional<Account> maybeAccount = findOne(Example.of(account));
        if (maybeAccount.isPresent()) {
            account = maybeAccount.get();
        } else {
            save(account);
        }

        return account;
    }
}
