package com.omigost.server.data.model;

import lombok.Data;

@Data
public class UserCommunication {
    User user;
    Communication communication;
    String value;
}
