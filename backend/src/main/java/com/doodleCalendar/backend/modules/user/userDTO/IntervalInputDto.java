package com.doodleCalendar.backend.modules.user.userDTO;

import java.time.LocalDateTime;

public class IntervalInputDto {
    public LocalDateTime startDateTime;
    public LocalDateTime endDateTime;

    public IntervalInputDto(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }
}
