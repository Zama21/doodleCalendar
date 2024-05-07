package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startsAt;
    private LocalDateTime endsAt;
    @Column(nullable = true)
    private Boolean isHidden = false;
    @ManyToOne(fetch = FetchType.LAZY)
    private User author;
    @ElementCollection
    private Set<Integer> repeatDays;
    @OneToMany()
    private Set<Room> rooms;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable
    private Set<User> members;
}
