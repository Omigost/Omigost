package com.omigost.server.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class Alert {
    private User user;
    private Communication communication;
    private Timestamp sendingTime;
    private String type;
    private AlertEvent event;
    private AlertResponse response;
    private AlertToken token;
}
