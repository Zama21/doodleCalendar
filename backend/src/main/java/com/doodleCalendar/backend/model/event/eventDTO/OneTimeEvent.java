package com.doodleCalendar.backend.model.event.eventDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OneTimeEvent {

    private Long id;
    private LocalDateTime startEvent;
    private LocalDateTime endEvent;
}
