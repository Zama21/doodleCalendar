package com.doodleCalendar.backend.model.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class RepeatsBusynessOutputDTO {

    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int repeatWeekDay;
}
