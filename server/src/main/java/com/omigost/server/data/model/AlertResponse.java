package com.omigost.server.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlertResponse {
    private long id;
    private String text;
    private String value;
}
