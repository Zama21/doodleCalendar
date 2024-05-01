package com.doodleCalendar.backend.model.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Data
public class RepeatsBusynessInputDTO {
    private LocalTime startTime;
    private LocalTime endTime;
    private int repeatWeekDay;
}
