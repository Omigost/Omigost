package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.TerminationService;
import com.omigost.server.rest.dto.TerminationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AWSTestController {

    @Autowired
    private OrganizationService organization;
    @Autowired
    private BudgetService budgets;

    @Autowired
    private TerminationService terminationService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.getAccounts();
    }

    @GetMapping("/budgets")
    public List<Budget> budgets() {
        return budgets.getBudgets();
    }

    @PostMapping("/hibernate")
    public void hibernate(@RequestBody TerminationRequest request) {
        terminationService.hibernate(request.getMachineId());
    }

    @PostMapping("/stop")
    public void stop(@RequestBody TerminationRequest request) {
        terminationService.stop(request.getMachineId());
    }

    @PostMapping("/terminate")
    public void terminate(@RequestBody TerminationRequest request) {
        terminationService.terminate(request.getMachineId());
    }
}
