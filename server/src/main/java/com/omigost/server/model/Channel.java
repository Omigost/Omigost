package com.omigost.server.model;

import com.omigost.server.notification.NotificationMessage;

import java.util.List;

public class Channel {
    User user;

    List<ChannelPreference> configuration; // abstract
    Medium medium;

    public boolean userWantsToReceive(NotificationMessage message) {
        // TODO figure out the kind of message we're trying to deliver
        // TODO use `configuration` attribute to check if user wants it to be delivered this way
        return true;
    }

    public void notify(NotificationMessage message) {
        if (userWantsToReceive(message)) {
            handleNotify(message);
        }
    }

    private String getRecipientDetails () {
        // TODO do some magic with the `configuration` attribute...
        // TODO figure out what the notificationService needs to deliver properly
        // TODO make String username param in the alerting function universal (other services need other data)
        return "TODO";
    }

    private void handleNotify(NotificationMessage message) {
        medium.sendAlertToUser(getRecipientDetails(), message);
    }
}
