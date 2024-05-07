package com.doodleCalendar.backend.modules.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OneTimeBusynessOutputDTO {

    private Long id;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
}
