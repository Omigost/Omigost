package com.omigost.server.rest;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.termination.ScheduledTerminationService;
import com.omigost.server.rest.dto.TerminationCronDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aws")
public class AWSController {
    @Autowired
    private OrganizationService organization;
    @Autowired
    private ScheduledTerminationService terminationService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }

    @PostMapping("/machineTermination")
    public void rescheduleTerminate(@RequestBody TerminationCronDTO cronDTO) {
        StringBuilder stringBuilder = new StringBuilder();
        for (TerminationCronDTO.TimeInterval timeInterval : cronDTO.getDayIntervals()) {
            stringBuilder.append(timeInterval.getStartHour())
                    .append("-")
                    .append(timeInterval.getEndHour())
                    .append(",");
        }
        String withoutLastComma = stringBuilder.toString().substring(0, stringBuilder.length() - 1  );
        String cron = String.format("0 0/%d %s * * *", cronDTO.getPeriod(), withoutLastComma);
        terminationService.scheduleNotificationService(cron);
    }

}
