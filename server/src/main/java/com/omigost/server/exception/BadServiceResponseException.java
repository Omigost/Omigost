package com.omigost.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.SERVICE_UNAVAILABLE)
public class BadServiceResponseException extends RuntimeException {
    public BadServiceResponseException(String message) {
        super(message);
    }
}
