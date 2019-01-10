package com.omigost.server.rest.dto;

import com.amazonaws.services.costexplorer.model.DateInterval;
import lombok.Data;

@Data
public class AWSDailySpending {
    String day;
    String spending;
    String unit;
}
