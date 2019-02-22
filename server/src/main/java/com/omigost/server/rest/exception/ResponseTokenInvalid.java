package com.omigost.server.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Alert Response Token is not valid")
public class ResponseTokenInvalid extends RuntimeException {
}
