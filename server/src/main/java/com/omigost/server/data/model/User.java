package com.omigost.server.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class User {
    private long id;
    private String name;
    private boolean isAdmin;
    private List<Account> accounts;
    private List<Communication> communications;
}
