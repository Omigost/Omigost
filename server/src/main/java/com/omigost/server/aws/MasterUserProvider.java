package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import com.amazonaws.services.identitymanagement.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterUserProvider {

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    public User getMasterUser() {
        AmazonIdentityManagement iamClient = AmazonIdentityManagementClientBuilder.standard().withCredentials(credentialsProvider).build();
        return iamClient.getUser().getUser();
    }
}
