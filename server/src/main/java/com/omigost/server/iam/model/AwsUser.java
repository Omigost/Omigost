package com.omigost.server.iam.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class AwsUser {
    AwsUser manager;
    String awsPath;
    String awsUserName;
    String awsUserId;
    String arn;
    List<Tag> tags;
    String slackToken;
}
