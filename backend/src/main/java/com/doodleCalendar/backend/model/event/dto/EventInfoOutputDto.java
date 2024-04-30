package com.doodleCalendar.backend.model.event.dto;

import com.doodleCalendar.backend.model.user.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class EventInfoOutputDto {
    public Long id;
    public String title;

    public List<String> rooms;

    public String description;

    public LocalDateTime startsAt;
    public LocalDateTime endsAt;

    public List<Integer> repeatsDays;

    public Set<User> selectedMembers;

}
