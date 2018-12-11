package com.omigost.server.data.model;

import lombok.Data;

@Data
public class AlertResponse {
    long id;
    String alertType;
    String text;
    String value;
}
