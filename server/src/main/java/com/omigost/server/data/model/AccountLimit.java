package com.omigost.server.data.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AccountLimit {
    Account account;
    Double moneyLimit;
    Timestamp startTime;
    Timestamp expireTime;
}
