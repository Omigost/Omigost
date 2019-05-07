package com.omigost.server.rest.dto.SlackResponse;

import lombok.Data;

import java.util.ArrayList;

@Data
public class SlackResponseDTO {
    private String type;
    ArrayList<Action> actions = new ArrayList<>();
    private String callback_id;
    Team team;
    Channel channel;
    User user;
    private String action_ts;
    private String message_ts;
    private String attachment_id;
    private String token;
    private String is_app_unfurl;
    Original_message original_message;
    private String response_url;
    private String trigger_id;

}

