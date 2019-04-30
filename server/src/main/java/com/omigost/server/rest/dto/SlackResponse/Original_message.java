package com.omigost.server.rest.dto.SlackResponse;

import lombok.Data;

import java.util.ArrayList;

@Data
public class Original_message {
    private String type;
    private String subtype;
    private String text;
    private String ts;
    private String username;
    private String bot_id;
    ArrayList<Attachment> attachments = new ArrayList<>();

}
