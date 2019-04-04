package com.omigost.server.aws;

import com.amazonaws.services.organizations.model.Account;

import java.util.List;


public interface OrganizationService {

    List<Account> fetchAccounts();

    boolean doesAccountExist(String accountName);
}
