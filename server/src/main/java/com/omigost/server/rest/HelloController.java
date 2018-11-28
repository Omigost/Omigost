package com.omigost.server.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Good morning, and in case I don't see ya: Good afternoon, good evening, and good night!\n";
    }
}
