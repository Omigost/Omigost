package com.omigost.server.notification;

import org.junit.Test;

import java.util.Objects;

public class NotificationMessageTest {
    @Test
    public void exampleNotificationMessageBuilds() {
        String testMainText = "testMainText";
        String testAttachmentText = "testAttachmentText";
        NotificationMessageAction testAction1 = null;
        NotificationMessageAction testAction2 = null;
        NotificationMessage testMessage = NotificationMessage.builder()
                .mainText(testMainText)
                .attachmentText(testAttachmentText)
                .action(testAction1)
                .action(testAction2)
                .build();

        assert (Objects.equals(testMessage.getMainText(), testMainText));
        assert (Objects.equals(testMessage.getAttachmentText(), testAttachmentText));
        assert (testMessage.getActions().size() == 2);
        assert (testAction2 == testMessage.getActions().get(1));
    }
}
