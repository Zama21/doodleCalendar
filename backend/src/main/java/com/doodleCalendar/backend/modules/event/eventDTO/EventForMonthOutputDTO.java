package com.doodleCalendar.backend.modules.event.eventDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventForMonthOutputDTO {

    private Long id;
    private String title;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
}
