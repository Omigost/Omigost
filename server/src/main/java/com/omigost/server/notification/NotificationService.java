package com.omigost.server.notification;

public interface NotificationService {
    void sendAlertToUser(String username, NotificationMessage message);
}
