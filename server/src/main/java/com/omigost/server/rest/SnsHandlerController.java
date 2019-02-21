package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.alerts.AlertService;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.notification.MainNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SnsHandlerController {

    @Autowired
    private BudgetService budgets;

    @Autowired
    private AlertService alerts;

    @PostMapping("/alerts/trigger")
    public void handleAlertTrigger(@RequestParam String budgetName) {
        Budget budget = budgets.getBudgetByName(budgetName);
        if (budget == null) throw new BudgetNotFound();
        alerts.alertBudgetTriggered(budget);
    }
}
