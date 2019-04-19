package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.alerts.AlertService;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.rest.dto.SubscriptionConfirmationRequest;
import com.omigost.server.rest.exception.BudgetNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/alerts")
public class AlertsController {
    @Autowired
    private BudgetService budgets;

    @Autowired
    private AlertService alerts;

    @Autowired
    private MainNotificationService notifications;

    @PostMapping("/requestLimitIncrease")
    public void handleLimitIncreaseRequest(@RequestParam String requestBody, @RequestParam String tokenString) {
        AlertResponseToken token = alerts.invalidateResponseToken(tokenString);
        notifications.requestLimitIncrease(requestBody, token);
    }

    @PostMapping("/trigger")
    public void handleAlertTrigger(@RequestParam String budgetName,
                                   @RequestBody(required = false) SubscriptionConfirmationRequest subscriptionConfirmationRequest) {
        if (subscriptionConfirmationRequest != null) {
            confirmBudgetSubscription(subscriptionConfirmationRequest);
        } else {
            triggerBudget(budgetName);
        }
    }

    private void confirmBudgetSubscription(SubscriptionConfirmationRequest confirmation) {
        new RestTemplate().getForEntity(confirmation.getSubscribeURL(), String.class);
    }

    private void triggerBudget(String name) {
        Budget budget = budgets.getBudgetByName(name);
        if (budget == null) {
            throw new BudgetNotFound();
        }

        alerts.handleBudgetTriggered(budget);
    }
}
