package com.omigost.server.data.model;

import lombok.Data;

@Data
public class Communication {
    long id;
    String name;
    String authToken;
}
