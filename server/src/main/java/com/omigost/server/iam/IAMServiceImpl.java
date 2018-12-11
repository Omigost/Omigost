package com.omigost.server.iam;

import com.amazonaws.services.identitymanagement.AmazonIdentityManagement;
import com.amazonaws.services.identitymanagement.model.ListUsersRequest;
import com.amazonaws.services.identitymanagement.model.ListUsersResult;
import com.amazonaws.services.identitymanagement.model.User;
import com.omigost.server.iam.model.AwsUser;
import com.omigost.server.iam.model.Tag;
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

        // results are paginated
        while (!gotAllUsers) {
            ListUsersResult response = iam.listUsers(request);
            List<User> users = response.getUsers();

            for (User u : users) {
                List<Tag> tags = u.getTags().stream()
                        .map(t -> new Tag(t.getKey(), t.getValue()))
                        .collect(Collectors.toCollection(ArrayList::new));

                AwsUser awsUser = AwsUser.builder()
                        .arn(u.getArn())
                        .awsPath(u.getPath())
                        .awsUserName(u.getUserName())
                        .tags(tags)
                        .build();

                resultList.add(awsUser);
            }

            request.setMarker(response.getMarker());

            if (!response.getIsTruncated()) {
                gotAllUsers = true;
            }
        }
        return resultList;
    }
}
