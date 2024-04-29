package com.doodleCalendar.backend.model.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OneTimeBusynessInputDTO {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
