package com.omigost.server.rest;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AWSTestController {

    @Autowired
    private Organization organization;


    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }
}
