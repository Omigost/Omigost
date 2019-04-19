package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.organizations.AWSOrganizations;
import com.amazonaws.services.organizations.AWSOrganizationsClientBuilder;
import com.amazonaws.services.organizations.model.Account;
import com.amazonaws.services.organizations.model.ListAccountsRequest;
import com.amazonaws.services.organizations.model.ListAccountsResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class OrganizationService {
    @Value("${aws.region}")
    private String region;

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    @Autowired
    private AWSOrganizations orgClient;

    //Can be optimized not to fetch accounts every time
    public List<Account> fetchAccounts() {
        ListAccountsRequest request = new ListAccountsRequest();
        ListAccountsResult result = orgClient.listAccounts(request);
        return result.getAccounts();
    }

    public boolean doesAccountExist(String accountName) {
        for (com.amazonaws.services.organizations.model.Account acc : fetchAccounts()) {
            if (acc.getName().equals(accountName)) {
                return true;
            }
        }

        return false;
    }
}
