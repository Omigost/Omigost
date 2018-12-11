package com.omigost.server.data.model;

import lombok.Data;

import java.util.List;

@Data
public class User {
    long id;
    String name;
    boolean isAdmin;
    List<Account> accounts;
    List<UserCommunication> communications;
}
