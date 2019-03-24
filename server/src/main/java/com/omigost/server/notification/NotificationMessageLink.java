package com.omigost.server.notification;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotificationMessageLink {
    protected String text, url, style;

    public NotificationMessageLink(String text, String url) {
        this(text, url, "primary");
    }

    public NotificationMessageLink(NotificationMessageLink link) {
        this.text = link.text;
        this.url = link.url;
        this.style = link.style;
    }
}
