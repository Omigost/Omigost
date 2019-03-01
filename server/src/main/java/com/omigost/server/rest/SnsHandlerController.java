package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
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
    private MainNotificationService notifications; // TODO should notifications be user-based? budget-based? where to store config and where to consider it in code

    @PostMapping("/alerts/trigger")
    public void handleAlertTrigger(@RequestParam String budgetName) {
        Budget budget = budgets.getBudgetByName(budgetName);
        if (budget == null) throw new BudgetNotFound();
        notifications.alertBudgetOverran(budget);
    }
}
