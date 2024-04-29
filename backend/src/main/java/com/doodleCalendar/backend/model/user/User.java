package com.doodleCalendar.backend.model.user;

import com.doodleCalendar.backend.model.busyness.Busyness;
import com.doodleCalendar.backend.model.event.Event;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //TODO убрать id или login взависимости от авторизации через lms
    private String login;
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String password;
    private String photoLink;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Busyness> busynesses;
    @ManyToMany
    private Set<Event> events;
}
