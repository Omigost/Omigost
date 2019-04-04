package com.omigost.server.rest.dto;

import com.amazonaws.services.costexplorer.model.DateInterval;
import lombok.Data;

@Data
public class AccountSpendingDTO {
    String userId;
    DateInterval dateInterval;
}
