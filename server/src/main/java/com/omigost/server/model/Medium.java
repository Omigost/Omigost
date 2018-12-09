package com.omigost.server.model;

import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationService;

public class Medium {
    private NotificationService notificationService;

    public void sendAlertToUser(String username, NotificationMessage message) {
        notificationService.sendAlertToUser(username, message);
    }
}
