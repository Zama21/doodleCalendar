package com.doodleCalendar.backend.model.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class RepeatsBusynessInputDTO {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int repeatWeekDay;
}
