package com.omigost.server;

import com.omigost.server.alert.CommunicationType;
import com.omigost.server.data.model.Account;
import com.omigost.server.data.model.Communication;
import com.omigost.server.data.model.User;

import java.util.ArrayList;
import java.util.List;

public class DataMocks {
    private static int accountId = 0;
    private static int communicationId = 0;
    private static int userId = 0;

    private static int accountId() {
        return accountId++;
    }

    private static int communicationId() {
        return communicationId++;
    }

    private static int userId() {
        return userId++;
    }

    public static List<User> getUsers() {
        List<User> result = new ArrayList<>();
        List<Account> accounts;
        List<Communication> communications;

        accounts = new ArrayList<>();
        accounts.add(new Account(accountId(), "Ogochi_QA"));
        accounts.add(new Account(accountId(), "Ogochi_DEV"));
        communications = new ArrayList<>();
        communications.add(new Communication(communicationId(), CommunicationType.SLACK, "Michał Ołtarzewski"));
        result.add(new User(userId(), "Ogochi", true, accounts, communications));

        accounts = new ArrayList<>();
        accounts.add(new Account(accountId(), "mbalc_QA"));
        accounts.add(new Account(accountId(), "mbalc_DEV"));
        communications = new ArrayList<>();
        communications.add(new Communication(communicationId(), CommunicationType.SLACK, "mbalc"));
        result.add(new User(userId(), "mbalc", false, accounts, communications));

        return result;
    }
}
