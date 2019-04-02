package com.omigost.server.rest;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.termination.EBSTerminationService;
import com.omigost.server.aws.termination.EC2TerminationService;
import com.omigost.server.aws.termination.RDSTerminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AWSTestController {

    @Autowired
    private OrganizationService organization;

    @Autowired
    private EC2TerminationService ec2TerminationService;

    @Autowired
    private RDSTerminationService rdsTerminationService;

    @Autowired
    private EBSTerminationService ebsTerminationService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }

}
