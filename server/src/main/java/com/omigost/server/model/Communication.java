package com.omigost.server.model;

import com.omigost.server.notification.NotificationService;
import com.omigost.server.notification.slack.SlackService;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Data
@Entity
@EqualsAndHashCode
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
    };
}
