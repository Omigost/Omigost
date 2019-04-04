package com.omigost.server.aws.termination;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.MachineListingService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.notification.slack.SlackService;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Terminates machines when running out of business hours
 */
@Service
public class ScheduledNotificationService {
    @Autowired
    EC2TerminationService ec2TerminationService;

    @Autowired
    MachineListingService machineListingService;

    @Autowired
    OrganizationService organizationService;

    @Autowired
    SlackService slackService;

    @Autowired
    AccountRepository accountRepository;

    //        @Scheduled(cron = "30 18-23/1,0-8/1 * * *")
    @Scheduled(cron = "1/1 * * * * ?")
    void terminateEC2OutOfBusinessHours() {
        List<Account> accountList = organizationService.fetchAccounts();
        for (Account account : accountList) {
            if (account.getEmail().contains("test")) {
                List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(account.getId());
                runningEC2Instances.size();
            }
        }
    }

}
