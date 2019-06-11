package com.omigost.server.notification;

import com.omigost.server.model.Communication;

public interface NotificationService {
    void sendMessageTo(Communication communication, NotificationMessage message);
}
