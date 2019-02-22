package com.omigost.server.notification;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotificationMessageLink {
    private String text, url, style;

    NotificationMessageLink(String text, String url) {
        this(text, url, "primary");
    }
}
