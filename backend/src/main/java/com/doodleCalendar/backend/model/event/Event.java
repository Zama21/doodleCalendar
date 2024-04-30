package com.doodleCalendar.backend.model.event;

import com.doodleCalendar.backend.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    @ManyToOne(fetch = FetchType.LAZY)
    private User author;
    @ElementCollection
    private Set<Integer> repeats;
    @ElementCollection
    private Set<String> rooms;
    @ManyToMany(mappedBy = "events")
    private Set<User> users;
}
