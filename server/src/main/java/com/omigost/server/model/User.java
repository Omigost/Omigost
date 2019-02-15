package com.omigost.server.model;

import java.util.List;

// TODO add database
public class User {
    Integer id;
    public String name;
    public Boolean isAdmin;

    public List<UserConnection> userConnections;
}
