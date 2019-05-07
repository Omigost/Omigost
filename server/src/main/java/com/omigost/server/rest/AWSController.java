package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.CostService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.termination.EBSTerminationService;
import com.omigost.server.aws.termination.EC2TerminationService;
import com.omigost.server.aws.termination.RDSTerminationService;
import com.omigost.server.rest.dto.AWSDailySpendingDTO;
import com.omigost.server.rest.dto.AccountSpendingDTO;
import com.omigost.server.rest.dto.TagSpendingDTO;
import com.omigost.server.rest.dto.TerminationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aws")
public class AWSController {
    @Autowired
    private OrganizationService organization;
    @Autowired
    private CostService costService;
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
