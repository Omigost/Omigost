package com.omigost.server.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Budget by this name could not be found")
public class BudgetNotFound extends RuntimeException {
}
