package com.omigost.server.aws.termination;

import com.omigost.server.aws.MachineListingService;
import com.omigost.server.model.Account;
import com.omigost.server.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

/**
 * Terminates machines when running out of business hours
 */
@Service
public class ScheduledNotificationService {
    @Autowired
    MachineListingService machineListingService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    SlackCommunicationService slackCommunicationService;

    //TODO time by time update list of new organization members
    //TODO programmable scheduler
    //@Scheduled(cron = "30 18-23/1,0-8/1 * * *")
//    @Scheduled(cron = "1/1 * * * * ?")
    public void notifyOutOfBusinessHours() {
        Collection<Account> accounts = accountRepository.getAllByScheduledNotification(true);
        for (Account account : accounts) {
            List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(account.getAwsId());
            if (runningEC2Instances.size() > 0) {
                slackCommunicationService.sendSlackReminder(account.getAwsId(), runningEC2Instances.size());
            }
        }
    }

}
