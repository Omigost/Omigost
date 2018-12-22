package com.omigost.server.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AlertToken {
    private String token;
    private boolean isActive;
}
