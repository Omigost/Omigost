package com.omigost.server.notification;

import com.omigost.server.model.UserConnection;

public interface NotificationService {
    void sendAlertToUser(UserConnection userConnection, NotificationMessage message);
}
