package com.omigost.server.notification;

import com.omigost.server.model.Communication;

public interface NotificationService {
    void sendAlertToUser(Communication communication, NotificationMessage message);
}
