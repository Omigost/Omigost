package com.omigost.server.notification;

public interface NotificationMessage {
    String getMainText();

    String getAttachmentsString();

    interface Builder {
        NotificationMessage build();

        Builder withMainText(String text);
        Builder withAttachmentText(String text);

        Builder withCallbackId(String callbackId);

        Builder addButton(String actionName, String text, String actionValue);
    }
}
