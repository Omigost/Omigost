package com.omigost.server.notification;

import com.amazonaws.services.budgets.model.Budget;
import com.omigost.server.aws.UserService;
import com.omigost.server.model.User;
import com.omigost.server.model.UserConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainNotificationService {
    @Autowired
    UserService users;

    public void alertBudgetOverran(Budget budget) {
        NotificationMessage message = budgetOverranMessage(/* TODO some data */);
        sendBudgetAlert(budget, message);
    }

    private void sendBudgetAlert(Budget budget, NotificationMessage message) {
        for (User user : users.getUsersResponsibleFor(budget)) {
            sendAlertToUser(user, message);
        }
    }

    private void sendAlertToUser(User user, NotificationMessage message) {
        for (UserConnection userConnection : user.userConnections) {
            // TODO consider user preferences here
            userConnection.connection.service.sendAlertToUser(userConnection, message);
        }
    }

    private NotificationMessage budgetOverranMessage(/* TODO some data */) {
        return NotificationMessage.builder()
                .mainText("TODO this message should have sth meaningful")
                .build();
    }
}

