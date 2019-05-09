package com.omigost.server.notification.message;

import com.omigost.server.model.User;
import com.omigost.server.notification.NotificationMessage;
import com.omigost.server.notification.NotificationMessageLink;
import org.springframework.beans.factory.annotation.Value;

public class LimitIncreaseRequestMessage extends NotificationMessage {
    @Value("${omigost.frontend.url}")
    private String frontendUrl;

    public LimitIncreaseRequestMessage(User applicant, String requestBody) {
        super(NotificationMessage.builder()
                .mainText(String.format(
                        "User %s (id: %s) requested a limit increase.\nReason:\"%s\"\n",
                        applicant.getName(),
                        applicant.getId().toString(),
                        requestBody
                ))
                .build());
        links.add(new NotificationMessageLink("Manage budgets", frontendUrl + "home/users-view")); // TODO any clearer but simple way?
    }
}
