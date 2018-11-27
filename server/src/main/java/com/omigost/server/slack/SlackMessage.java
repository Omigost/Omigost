package com.omigost.server.slack;

public class SlackMessage {

    private SlackMessage() {}

    public static class Builder {

        public SlackMessage build() {
            SlackMessage msg = new SlackMessage();
            return msg;
        }
    }
}
