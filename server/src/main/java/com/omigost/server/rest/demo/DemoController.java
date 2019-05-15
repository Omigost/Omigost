package com.omigost.server.rest.demo;

import com.amazonaws.services.organizations.AWSOrganizations;
import com.amazonaws.services.organizations.model.CreateAccountRequest;
import com.amazonaws.services.organizations.model.CreateAccountResult;
import com.amazonaws.services.organizations.model.CreateOrganizationRequest;
import com.amazonaws.services.organizations.model.ListAccountsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
