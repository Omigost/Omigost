package com.omigost.server.rest.dto;

import lombok.Data;
import org.springframework.util.MultiValueMap;

import java.util.List;

@Data
public class BudgetCreateRequest {
    int limit;
    List<String> linkedAccounts;
    MultiValueMap<String, String> tags;
}
