package com.omigost.server.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Communication {
    private long id;
    private String name;
    private String value;
}
