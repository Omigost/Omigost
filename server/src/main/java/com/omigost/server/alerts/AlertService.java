package com.omigost.server.alerts;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.Alert;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.notification.NotificationMessage;
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

    public void handleBudgetTriggered(Budget budget) {
        NotificationMessage budgetTriggeredMessage = notifications.budgetTriggeredMessage(budget);

        for (Communication communication : notifications.getBudgetOwnersCommunications(budget)) {
            triggerBudgetAlert(communication, budgetTriggeredMessage);
        }
    }

    private void triggerBudgetAlert(Communication communication, NotificationMessage message) {
        AlertResponseToken token = new AlertResponseToken();

        Alert alert = Alert
                .builder()
                .communication(communication)
                .token(tokenRepo.save(token))
                .build();

        alertRepo.save(alert);

        communication.service().sendAlertToUser(communication, message);
    }

    }
}
