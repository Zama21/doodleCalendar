package com.doodleCalendar.backend.modules.busyness.busynessDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OneTimeBusynessInputDTO {
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
}
