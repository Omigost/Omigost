package com.omigost.server.aws;

import com.amazonaws.auth.PropertiesFileCredentialsProvider;
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
public class Organization {

    @Value("${aws-region}")
    String region;
    @Autowired
    PropertiesFileCredentialsProvider credentialsProvider;

    private AWSOrganizations orgClient;

    @PostConstruct
    void initializeOrganizationClient() {
        orgClient = AWSOrganizationsClientBuilder
                .standard()
                .withCredentials(credentialsProvider)
                .withRegion(region)
                .build();

    }


    public List<Account> fetchAccounts() {
        ListAccountsRequest request = new ListAccountsRequest();
        ListAccountsResult result = orgClient.listAccounts(request);
        List<Account> accountList = result.getAccounts();
        return accountList;
    }

}
