package com.omigost.server.alerts;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.Alert;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.repository.AlertRepository;
import com.omigost.server.repository.AlertResponseTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlertService {
    @Autowired
    private MainNotificationService notifications;

    @Autowired
    private AlertResponseTokenRepository tokenRepo;

    @Autowired
    private AlertRepository alertRepo;

    public void alertBudgetTriggered(Budget budget) {
        AlertResponseToken token = new AlertResponseToken();
        Alert alert = new Alert();

        alert.token = tokenRepo.save(token);
        alertRepo.save(alert);

        notifications.alertBudgetTriggered(budget);
    }
}
