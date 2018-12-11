package com.omigost.server.data.model;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class GroupLimit {
    Group group;
    Double moneyLimit;
    Timestamp startTime;
    Timestamp expireTime;
}
