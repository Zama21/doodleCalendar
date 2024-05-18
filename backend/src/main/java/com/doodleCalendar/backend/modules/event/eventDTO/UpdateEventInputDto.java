package com.doodleCalendar.backend.modules.event.eventDTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data()
public class UpdateEventInputDto {
    public String title;
    public String description;
    public LocalDateTime startsAt;
    public LocalDateTime endsAt;
    public Boolean isHidden = false;
    public Set<Integer> repeatDays;
    public Set<String> rooms;
    public Set<Long> membersIds;
}
