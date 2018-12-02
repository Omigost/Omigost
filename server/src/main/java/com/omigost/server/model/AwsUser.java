package com.omigost.server.model;

import lombok.Builder;

import java.util.List;

@Builder
public class AwsUser {
    AwsUser manager;
    String awsPath;
    String awsUserName;
    String awsUserId;
    String arn;
    List<Tag> tags;
    String slackToken;
}
