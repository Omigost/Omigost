package com.omigost.server.rest.dto.SlackResponse;

import lombok.Data;

import java.util.ArrayList;

@Data
public class Attachment {
    private String callback_id;
    private String fallback;
    private String text;
    private float id;
    ArrayList<Action> actions = new ArrayList<>();

}
