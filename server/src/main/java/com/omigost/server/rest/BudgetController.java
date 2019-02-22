package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/budgets")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    public List<Budget> getBudgets() {
        return budgetService.getBudgets();
    }

    public void createBudget() {

    }

    public void createBudgets() {

    }

    public void deleteBudget() {

    }
}
