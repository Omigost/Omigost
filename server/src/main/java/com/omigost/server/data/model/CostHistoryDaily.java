package com.omigost.server.data.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class CostHistoryDaily {
    Account account;
    Timestamp timestamp;
    Double costThisMonth;
}
