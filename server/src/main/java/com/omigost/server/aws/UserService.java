package com.omigost.server.aws;

import com.amazonaws.services.budgets.model.*;
import com.omigost.server.model.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @PostConstruct
    public void init() {
    }

    public List<User> getUsersResponsibleFor(Budget budget) {
        // TODO gdzie to mamy?
        return new ArrayList<>();
    }
}
