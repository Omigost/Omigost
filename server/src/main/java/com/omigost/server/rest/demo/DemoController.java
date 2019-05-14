package com.omigost.server.rest.demo;

import com.amazonaws.services.budgets.model.Budget;
import com.amazonaws.services.organizations.AWSOrganizations;
import com.amazonaws.services.organizations.model.CreateAccountRequest;
import com.amazonaws.services.organizations.model.CreateAccountResult;
import com.amazonaws.services.organizations.model.CreateOrganizationRequest;
import com.amazonaws.services.organizations.model.ListAccountsRequest;
import com.omigost.server.alerts.AlertService;
import com.omigost.server.aws.BudgetService;
import com.omigost.server.model.AlertResponseToken;
import com.omigost.server.notification.MainNotificationService;
import com.omigost.server.rest.dto.RequestLimitIncreaseRequest;
import com.omigost.server.rest.dto.SubscriptionConfirmationRequest;
import com.omigost.server.rest.exception.BudgetNotFound;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/demo")
public class DemoController {
    @Autowired
    private AWSOrganizations orgClient;

    @GetMapping("/init")
    public String initializeDemo() {
        // Create organization
        orgClient.createOrganization(new CreateOrganizationRequest().withFeatureSet("ALL"));

        // Create test accounts
        for(int i=0;i<5;++i) {
            // Create account
            final CreateAccountResult acc = orgClient.createAccount(
                    new CreateAccountRequest()
                            .withAccountName("test-account-"+i)
                            .withEmail("test_account_"+i+"@gmail.com")
                            .withRoleName("root")
            );
        }

        assert(orgClient.listAccounts(new ListAccountsRequest()).getAccounts().size() > 0);

        return "OK";
    }
}
