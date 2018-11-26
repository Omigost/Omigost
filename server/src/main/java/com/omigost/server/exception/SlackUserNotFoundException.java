package com.omigost.server.exception;

public class SlackUserNotFoundException extends RuntimeException {
    public SlackUserNotFoundException() {
    }

    public SlackUserNotFoundException(String message) {
        super(message);
    }
}
