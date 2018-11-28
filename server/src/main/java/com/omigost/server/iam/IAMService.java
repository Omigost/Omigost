package com.omigost.server.iam;

import com.omigost.server.model.AwsUser;

import java.util.List;

public interface IAMService {
    List<AwsUser> users();

}
