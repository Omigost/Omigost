package com.omigost.server.iam.impl;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClient;
import com.amazonaws.services.identitymanagement.AmazonIdentityManagementClientBuilder;
import com.amazonaws.services.identitymanagement.model.ListUsersRequest;
import com.amazonaws.services.identitymanagement.model.ListUsersResult;
import com.amazonaws.services.identitymanagement.model.User;
import com.omigost.server.iam.IAMService;
import com.omigost.server.model.AwsUser;
import com.omigost.server.model.Tag;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class IAMServiceImpl implements IAMService {
    private AmazonIdentityManagement iam;
    @Override
    public List<AwsUser> users() {

        boolean gotAllUsers = false;
        List<AwsUser> resultList = new ArrayList<>();
        ListUsersRequest request = new ListUsersRequest();

        //results are paginated
        while (!gotAllUsers) {
            ListUsersResult response = iam.listUsers(request);
            List<User> users = response.getUsers();

            List<AwsUser> awsUsers = users.stream()
                    .map(user -> AwsUser.builder()
                            .arn(user.getArn())
                            .awsPath(user.getPath())
                            .awsUserName(user.getUserName())
                            .tags(
                                    user.getTags().stream()
                                            .map(tag -> new Tag(tag.getKey(), tag.getValue()))
                                            .collect(Collectors.toCollection(ArrayList::new)))
                            .build())
                    .collect(Collectors.toCollection(ArrayList::new));
            resultList.addAll(awsUsers);
            request.setMarker(response.getMarker());
            if (!response.getIsTruncated()) {
                gotAllUsers = true;
            }
        }
        return resultList;
    }
}
