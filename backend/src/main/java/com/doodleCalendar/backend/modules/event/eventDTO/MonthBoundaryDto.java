package com.doodleCalendar.backend.modules.event.eventDTO;

import java.time.LocalDateTime;

public class MonthBoundaryDto {
    public LocalDateTime weekBeforeStart;
    public LocalDateTime weekAfterEnd;

    public MonthBoundaryDto(LocalDateTime weekBeforeStart, LocalDateTime weekAfterEnd) {
        this.weekBeforeStart = weekBeforeStart;
        this.weekAfterEnd = weekAfterEnd;
    }
}
