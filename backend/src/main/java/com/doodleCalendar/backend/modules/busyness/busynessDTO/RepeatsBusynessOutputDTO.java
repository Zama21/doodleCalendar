package com.doodleCalendar.backend.modules.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalTime;

@Data
public class RepeatsBusynessOutputDTO {

    private Long id;
    private LocalTime startTime;
    private LocalTime endTime;
    private int repeatWeekDay;
}
