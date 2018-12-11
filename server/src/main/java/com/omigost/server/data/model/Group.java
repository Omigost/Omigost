package com.omigost.server.data.model;

import lombok.Data;

import java.util.List;

@Data
public class Group {
    long id;
    String tag;
    List<GroupLimit> limits;
}
