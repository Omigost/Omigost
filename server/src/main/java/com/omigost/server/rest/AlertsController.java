package com.omigost.server.rest;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.alerts.AlertService;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.AlertResponse;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.repository.AlertRepository;
import com.omigost.server.rest.dto.LimitIncreaseRequestRequest;
import com.omigost.server.rest.dto.SubscriptionConfirmationRequest;
import com.omigost.server.rest.exception.BudgetNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/alerts")
public class AlertsController {
    @Autowired
    private BudgetService budgets;

    @Autowired
    private AlertService alerts;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private MainNotificationService notifications;

    @PostMapping("/requestLimitIncrease")
    @Transactional
    public void handleLimitIncreaseRequest(@RequestBody LimitIncreaseRequestRequest body) {
        AlertResponseToken token = alerts.requireAlertResponseToken(body.getToken());
        String reason = body.getReason();

        AlertResponse response = alerts.createAlertResponse(token, reason);
        notifications.notifyOfLimitIncreaseRequest(response);
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
