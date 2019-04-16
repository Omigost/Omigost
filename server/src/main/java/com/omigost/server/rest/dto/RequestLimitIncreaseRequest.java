package com.omigost.server.rest.dto;

import lombok.Data;

@Data
public class RequestLimitIncreaseRequest {
    String reason;
    String token;
}
