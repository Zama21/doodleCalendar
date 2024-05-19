package com.doodleCalendar.backend.modules.event.eventDTO.calendar;

import com.doodleCalendar.backend.modules.event.Room;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class EventForMonthWithRoomsOutputDTO {
    private Long id;
    private String title;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;

    private Set<String> rooms;
}
