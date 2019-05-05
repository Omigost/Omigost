package com.omigost.server.rest;

import com.omigost.server.settings.InstanceSettingsService;
import com.omigost.server.settings.model.InstanceSettingsUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instance")
public class InstanceSettingsController {

    @Autowired
    private InstanceSettingsService instanceSettingsService;

    @GetMapping("/settings")
    public InstanceSettingsUpdateDTO getSettings() {
        return instanceSettingsService.getSettings();
    }

    @PostMapping("/settings")
    public InstanceSettingsUpdateDTO tagSpending(@RequestBody InstanceSettingsUpdateDTO request) {
        return instanceSettingsService.updateSettings(request);
    }

}
