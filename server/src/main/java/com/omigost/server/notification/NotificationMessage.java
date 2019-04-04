package com.omigost.server.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

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

    @Singular
    protected List<NotificationMessageLink> links;

    protected NotificationMessage (NotificationMessage message) {
        this(message.mainText, message.attachmentText, message.actions, message.links);
    }
}
