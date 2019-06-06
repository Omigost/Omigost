package com.omigost.server.repository;

import com.omigost.server.model.Account;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account getAccountByName(String name);

    List<Account> getAllByScheduledNotification(boolean val);

    List<Account> getAll();

    default Account getOrCreate(String name) {
        Account account = new Account();
        account.setName(name);

        Optional<Account> maybeAccount = findOne(Example.of(account));
        if (maybeAccount.isPresent()) {
            account = maybeAccount.get();
        } else {
            save(account);
        }

        return account;
    }
}
