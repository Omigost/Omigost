package com.omigost.server.model;

import com.omigost.server.notification.NotificationService;

import java.util.List;

// TODO add database
public class Connection {
    Integer id;
    public String name;

    public NotificationService service;
    public List<User> users;
}
