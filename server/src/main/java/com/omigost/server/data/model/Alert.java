package com.omigost.server.data.model;

import java.sql.Timestamp;

public class Alert {
    User user;
    Timestamp sendingTime;
    AlertType type;
    AlertEvent event;
    AlertResponse response;
    AlertToken token;
}
