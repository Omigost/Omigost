package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.alerts.AlertService;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.rest.exception.BudgetNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alerts")
public class AlertsController {
    @Autowired
    private BudgetService budgets;

    @Autowired
    private AlertService alerts;

    @PostMapping("/trigger")
    public void handleAlertTrigger(@RequestParam String budgetName) throws BudgetNotFound {
        Budget budget = budgets.getBudgetByName(budgetName);
        if (budget == null) throw new BudgetNotFound();
        alerts.handleBudgetTriggered(budget);
    }
}
