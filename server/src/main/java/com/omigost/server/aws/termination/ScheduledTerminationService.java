package com.omigost.server.aws.termination;

import com.omigost.server.aws.MachineListingService;
import com.omigost.server.model.Account;
import com.omigost.server.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

/**
 * Terminates machines when running out of business hours
 */
@Service
@Slf4j
public class ScheduledTerminationService {
    @Autowired
    MachineListingService machineListingService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    SlackCommunicationService slackCommunicationService;

    private final String initialCron = "0 0/30 18-23,0-8 * * *";

    private ScheduledFuture<?> runningFuture = null;
    private TaskScheduler taskScheduler = new ConcurrentTaskScheduler();


    private void notifyOutOfBusinessHours() {
        Collection<Account> accounts = accountRepository.getAllByScheduledNotification(true);
        for (Account account : accounts) {
            List<String> runningEC2Instances = machineListingService.getRunningEC2Instances(account.getAwsId());
            if (runningEC2Instances.size() > 0) {
                slackCommunicationService.sendSlackReminder(account.getAwsId(), runningEC2Instances.size());
            }
        }
    }

    @PostConstruct
    private void startInitialCronJob() {
        scheduleNotificationService(initialCron);
    }

    public void scheduleNotificationService(String cron) {
        if (runningFuture != null) {
            runningFuture.cancel(false);
        }

        CronTrigger trigger = new CronTrigger(cron);
        runningFuture = taskScheduler.schedule(this::notifyOutOfBusinessHours, trigger);
        log.info("the termination cron changed to " + cron);
    }

}
