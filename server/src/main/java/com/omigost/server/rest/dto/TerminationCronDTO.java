package com.omigost.server.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class TerminationCronDTO {
    @Data
    public static class TimeInterval {
        int startHour;
        int endHour;

    }
    List<TimeInterval> dayIntervals;
    int period;
}

