package com.omigost.server.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import com.omigost.server.model.User;
import com.omigost.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MasterUserProvider {

    @Value("${aws.region}")
    String region;

    @Autowired
    private AWSCredentialsProvider credentialsProvider;

    @Autowired
    private AmazonIdentityManagement amazonIdentityManagement;

    @Autowired
    private UserRepository userRepository;

    @Value("${omigost.administratorUsername}")
    private String adminUsername;

    public String getMasterUserId() {
        // Extracting accountId from arn
        return amazonIdentityManagement.getUser().getUser().getArn().split(":")[4];
    }

    public User omigostAdministratorUser() {
        User admin = userRepository.getUserByName(adminUsername);
        if (admin == null) {
            throw new RuntimeException("Admin username couldn't be found by the name %s specified in properties");
        }
        return admin;
    }
}
