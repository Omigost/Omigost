package com.omigost.server.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Budget by this type could not be found")
public class BudgetNotFound extends RuntimeException {
}
