package com.omigost.server.rest.dto;

import lombok.Data;

@Data
public class AWSDailySpendingDTO {
    String day;
    String spending;
    String unit;
}
