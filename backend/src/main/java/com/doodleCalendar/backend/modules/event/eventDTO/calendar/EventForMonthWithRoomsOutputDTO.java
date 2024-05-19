package com.doodleCalendar.backend.modules.event.eventDTO.calendar;

import com.doodleCalendar.backend.modules.event.Room;

import java.time.LocalDateTime;
import java.util.Set;

public class EventForMonthWithRoomsOutputDTO {
    private Long id;
    private String title;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;

    private Set<Room> rooms;
}
