package com.omigost.server.data.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Alert {
    User user;
    Communication communication;
    Timestamp sendingTime;
    String type;
    AlertEvent event;
    AlertResponse response;
    AlertToken token;
}
