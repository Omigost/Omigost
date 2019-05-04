package com.omigost.server.rest.dto;

import lombok.Data;

import java.util.List;

/**
 * 0 <=startHour, endHour <=23
 */
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

