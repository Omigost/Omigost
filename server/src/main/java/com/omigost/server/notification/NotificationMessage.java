package com.omigost.server.notification;

import lombok.*;

import java.util.LinkedList;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder(toBuilder = true)
public class NotificationMessage {
    @Builder.Default
    protected String mainText = "";
    @Builder.Default
    protected String attachmentText = "";

    @Singular
    protected List<NotificationMessageAction> actions;

    protected NotificationMessage (NotificationMessage message) {
        this(message.mainText, message.attachmentText, message.actions);
    }
}
