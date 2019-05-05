package com.omigost.server.settings.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

public class InstanceSettingsUpdateDTO {
    @Getter
    @Setter
    Map<String, String> properties;
}
