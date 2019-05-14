package com.omigost.server.rest;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.CostService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.termination.ScheduledTerminationService;
import com.omigost.server.rest.dto.*;
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
    @Autowired
    private CostService costService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }

    @PostMapping("/machineTermination")
    public void rescheduleTerminate(@RequestBody TerminationCronDTO cronDTO) {
        StringBuilder stringBuilder = new StringBuilder();
        for (TerminationCronDTO.TimeInterval timeInterval : cronDTO.getDayIntervals()) {
            if (timeInterval.getStartHour() > timeInterval.getEndHour()) {
                stringBuilder.append(timeInterval.getStartHour()).append("-").append("23").append(",");
                stringBuilder.append("0").append("-").append(timeInterval.getEndHour()).append(",");

            } else {
                stringBuilder.append(timeInterval.getStartHour())
                        .append("-").append(timeInterval.getEndHour()).append(",");
            }
        }
        String withoutLastComma = stringBuilder.toString().substring(0, stringBuilder.length() - 1);
        String cron = String.format("0 0/%d %s * * *", cronDTO.getPeriod(), withoutLastComma);
        terminationService.scheduleNotificationService(cron);
    }


    @PostMapping("/spending/account")
    public List<AWSDailySpendingDTO> spending(@RequestBody AccountSpendingDTO request) {
        return costService.getSpendingForAccount(request.getDateInterval(), request.getUserId());
    }

    @PostMapping("/spending/tag")
    public List<AWSDailySpendingDTO> tagSpending(@RequestBody TagSpendingDTO request) {
        return costService.getSpendingForTags(request.getDateInterval(), request.getTags());
    }

}