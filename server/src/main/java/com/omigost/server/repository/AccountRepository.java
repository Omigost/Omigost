package com.omigost.server.repository;

import com.omigost.server.model.Account;

public interface AccountRepository extends BaseRepository<Account> {
    Account getAccountByName(String name);
}
