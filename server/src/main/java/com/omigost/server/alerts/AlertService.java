package com.omigost.server.alerts;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.exception.AccessForbiddenException;
import com.omigost.server.model.Alert;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.model.Communication;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.message.BudgetTriggeredMessage;
import com.omigost.server.repository.AlertRepository;
import com.omigost.server.repository.AlertResponseTokenRepository;
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

        NotificationMessage budgetTriggeredMessage = new BudgetTriggeredMessage(budget, token);

        notifications.sendMessageTo(communication, budgetTriggeredMessage);
    }

    public AlertResponseToken invalidateResponseToken(String tokenString) throws AccessForbiddenException {
        Optional<AlertResponseToken> maybeToken = tokenRepo.findAlertResponseTokenByToken(tokenString);
        if (!maybeToken.isPresent()) throw new AccessForbiddenException("Alert Response Token is not valid");
        AlertResponseToken token = maybeToken.get();
        token.invalidate();
        return tokenRepo.save(token);
    }
}
