package com.omigost.server.alerts;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.model.Alert;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.repository.AlertRepository;
import com.omigost.server.repository.AlertResponseTokenRepository;
import com.omigost.server.rest.exception.ResponseTokenInvalid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AlertService {
    @Autowired
    private MainNotificationService notifications;

    @Autowired
    private AlertResponseTokenRepository tokenRepo;

    @Autowired
    private AlertRepository alertRepo;

    public void handleBudgetTriggered(Budget budget) {
        for (Communication communication : notifications.getBudgetOwnersCommunications(budget)) {
            triggerBudgetTriggeredAlert(communication, budget);
        }
    }

    private void triggerBudgetTriggeredAlert(Communication communication, Budget budget) {
        AlertResponseToken token = new AlertResponseToken();

        Alert alert = Alert
                .builder()
                .communication(communication)
                .token(tokenRepo.save(token))
                .build();

        alertRepo.save(alert);

        NotificationMessage budgetTriggeredMessage = notifications.budgetTriggeredMessage(budget, token.token);

        communication.service().sendAlertToUser(communication, budgetTriggeredMessage);
    }

    public void invalidateResponseToken(String tokenString) throws ResponseTokenInvalid {
        Optional<AlertResponseToken> maybeToken = tokenRepo.findAlertResponseTokenBy(tokenString);
        if (!maybeToken.isPresent()) throw new ResponseTokenInvalid();
        AlertResponseToken token = maybeToken.get();
        token.invalidate();
        tokenRepo.save(token);
    }
}
