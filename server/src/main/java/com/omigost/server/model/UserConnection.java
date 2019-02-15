package com.omigost.server.model;

// TODO add database
public class UserConnection {
    Integer id;
    public User user;
    public Connection connection;

    public String serviceUsername; // TODO eventually support other properties with new fields if needed
    // TODO represent user preferences here somehow
}
