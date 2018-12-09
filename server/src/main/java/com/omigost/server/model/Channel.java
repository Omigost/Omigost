package com.omigost.server.model;

import com.omigost.server.notification.NotificationMessage;

import java.util.List;

public class Channel {
    User user;

    List<ChannelPreference> configuration; // abstract
    Medium medium;

    public boolean userWantsToReceive(NotificationMessage message) {
        return true; // TODO use `configuration` attribute to check
    }

    public void notify(NotificationMessage message) {
        if (userWantsToReceive(message)) {
            handleNotify(message);
        }
    }

    private String getRecipientDetails () {
        // TODO do some magic with the `configuration` attribute...
        return "TODO";
    }

    private void handleNotify(NotificationMessage message) {
        medium.sendAlertToUser(getRecipientDetails(), message);
    }
}
