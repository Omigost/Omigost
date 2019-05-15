package com.omigost.server.rest.dto;

import lombok.Data;

@Data
public class LimitIncreaseRequestRequest {
    String reason;
    String token;
}
