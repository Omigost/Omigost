package com.omigost.server.data.model;

import lombok.Data;

@Data
public class AlertToken {
    String token;
    boolean isActive;
}
