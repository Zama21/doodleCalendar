package com.doodleCalendar.backend.model.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OneTimeBusynessOutputDTO {

    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDate startDate;
    private LocalDate endDate;
}
