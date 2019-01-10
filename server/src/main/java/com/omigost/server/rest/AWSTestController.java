package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.aws.CostService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.rest.dto.AWSDailySpending;
import com.omigost.server.rest.dto.AccountSpendingDTO;
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
    private CostService costService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }

    @GetMapping("/budgets")
    public List<Budget> budgets() {
        return budgets.getBudgets();
    }

    @PostMapping("/spending")
    public List<AWSDailySpending> spending(@RequestBody AccountSpendingDTO request) {
        return costService.getSpendingForAccount(request.getInterval(), request.getUserId());
    }
}
