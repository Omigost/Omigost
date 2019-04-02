package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.rest.dto.BudgetCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public List<Budget> getBudgets() {
        return budgetService.getBudgets();
    }

    @PostMapping(value = "/create")
    public void createBudget(@RequestBody BudgetCreateRequest budgetCreateRequest) {
        budgetService.createBudget(budgetCreateRequest.getLimit(), budgetCreateRequest.getLinkedAccounts(),
                new LinkedMultiValueMap<>(budgetCreateRequest.getTags()));
    }

    @PostMapping("/createSeparateBudgets")
    public void createBudgets(@RequestBody BudgetCreateRequest budgetCreateRequest) {
        budgetService.createSeparateBudgets(budgetCreateRequest.getLimit(), budgetCreateRequest.getLinkedAccounts());
    }

    @DeleteMapping
    public void deleteBudget(@RequestParam String name) {
        budgetService.deleteBudget(name);
    }
}
