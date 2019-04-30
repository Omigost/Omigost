package com.omigost.server.rest.dto.SlackResponse;

import lombok.Data;

@Data
public class Action {
    private String id;
    private String name;
    private String text;
    private String type;
    private String value;
    private String style;
}
