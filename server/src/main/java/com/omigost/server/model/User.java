package com.omigost.server.model;

import com.omigost.server.notification.NotificationMessage;

import java.util.List;

public class User {
    String name;
    List<AwsAccount> accounts;
    List<Channel> channels;

    public void notify(NotificationMessage message) {
        for (Channel channel : channels) {
            channel.notify(message);
        }
    }
}
