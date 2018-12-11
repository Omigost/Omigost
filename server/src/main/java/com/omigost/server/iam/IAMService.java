package com.omigost.server.iam;

import com.omigost.server.iam.model.AwsUser;

import java.util.List;

public interface IAMService {
    List<AwsUser> users();
}
