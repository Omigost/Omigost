package com.omigost.server.rest.dto;

import com.amazonaws.services.costexplorer.model.DateInterval;
import lombok.Data;

/**
 * example date format 2017-10-25
 * */
@Data
public class AWSDateIntervalDTO {
    String start;
    String end;
    public DateInterval toDateInterval(){
        return new DateInterval().withStart(start).withEnd(end);
    }
}
