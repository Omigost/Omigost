package com.omigost.server.data.model;

import lombok.Data;

import java.util.List;

@Data
public class Account {
    long id;
    String name;
    List<Group> groups;
    List<AccountLimit> accountLimits;
    List<CostHistoryDaily> costHistoryDaily;
    List<CostHistoryHourly> costHistoryHourly;
}
