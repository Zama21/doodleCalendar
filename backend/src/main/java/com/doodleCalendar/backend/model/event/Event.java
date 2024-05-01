package com.doodleCalendar.backend.model.event;

import com.doodleCalendar.backend.model.user.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startEvent;
    private LocalDateTime endEvent;
    @ElementCollection
    private Set<Integer> repeats;
    @ElementCollection
    private Set<String> auditoriums;
    @ManyToMany(mappedBy = "events")
    private Set<User> users;
}
