package com.doodleCalendar.backend.model.event.eventDTO;

import com.doodleCalendar.backend.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data()
public class CreateEventInputDto {
    public String title;
    public String description;
    public LocalDateTime startsAt;
    public LocalDateTime endsAt;
    public Boolean isHidden = false;
    public Set<Integer> repeatDays;
    public Set<String> rooms;
    public Set<Long> membersIds;
}
