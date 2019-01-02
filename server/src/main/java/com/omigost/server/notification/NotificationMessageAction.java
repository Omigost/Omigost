package com.omigost.server.notification;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotificationMessageAction {
    private String name, text, value;

    public NotificationMessageAction(NotificationMessageAction action) {
        this(action.name, action.text, action.value);
    }
}
