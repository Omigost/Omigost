package com.omigost.server.model;

import com.omigost.server.notification.NotificationService;
import com.omigost.server.notification.slack.SlackService;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Communication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @NotNull
    public String name;

    @NotNull
    public String value;

    public NotificationService service() {
        switch (name) {
            case "slack":
                return new SlackService();
            default:
                throw new RuntimeException("Communication type not supported!");
        }
    }

    ;
}
