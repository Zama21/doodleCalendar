package com.doodleCalendar.backend.model.event.eventDTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Data()
public class EventInfoOutputDto {
    public Long id;
    public String title;
    public String description;
    public Set<String> rooms;
    public Boolean isHidden;
    public LocalDateTime startsAt;
    public LocalDateTime endsAt;
    public List<Integer> repeatDays;
    public Set<EventMemberInfoDto> members;

}
