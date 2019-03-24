package com.omigost.server.rest;

import com.amazonaws.services.organizations.model.Account;
import com.omigost.server.aws.CostService;
import com.omigost.server.aws.OrganizationService;
import com.omigost.server.aws.termination.EBSTerminationService;
import com.omigost.server.aws.termination.EC2TerminationService;
import com.omigost.server.aws.termination.RDSTerminationService;
import com.omigost.server.rest.dto.AWSDailySpendingDTO;
import com.omigost.server.rest.dto.AccountSpendingDTO;
import com.omigost.server.rest.dto.TagSpendingDTO;
import com.omigost.server.rest.dto.TerminationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/aws")
public class AWSController {
    @Autowired
    private OrganizationService organization;
    @Autowired
    private CostService costService;
    @Autowired
    private EC2TerminationService ec2TerminationService;
    @Autowired
    private RDSTerminationService rdsTerminationService;
    @Autowired
    private EBSTerminationService ebsTerminationService;

    @GetMapping("/organizations")
    public List<Account> accounts() {
        return organization.fetchAccounts();
    }

    @PostMapping("/spending/account")
    public List<AWSDailySpendingDTO> spending(@RequestBody AccountSpendingDTO request) {
        return costService.getSpendingForAccount(request.getDateInterval(), request.getUserId());
    }

    @PostMapping("/spending/tag")
    public List<AWSDailySpendingDTO> tagSpending(@RequestBody TagSpendingDTO request) {
        return costService.getSpendingForTags(request.getDateInterval(), request.getTags());
    }
    @PostMapping("/ec2/hibernate")
    public void hibernateEC2(@RequestBody TerminationRequest request) {
        ec2TerminationService.hibernate(request.getMachineIds());
    }

    @PostMapping("/ec2/stop")
    public void stopEC2(@RequestBody TerminationRequest request) {
        ec2TerminationService.stop(request.getMachineIds());
    }

    @PostMapping("/ec2/terminate")
    public void terminateEC2(@RequestBody TerminationRequest request) {
        ec2TerminationService.terminate(request.getMachineIds());
    }

    @PostMapping("/rds/stop")
    public void stopRDS(@RequestBody TerminationRequest request) {
        rdsTerminationService.stop(request.getMachineIds());
    }

    @PostMapping("/ebs/stop")
    public void stopEBS(@RequestBody TerminationRequest request) {
        ebsTerminationService.stop(request.getMachineIds());
    }
}
