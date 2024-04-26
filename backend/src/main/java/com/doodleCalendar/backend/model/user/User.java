package com.doodleCalendar.backend.model.user;

import com.doodleCalendar.backend.model.event.Event;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity(name = "user_profile")
@Data
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
    @ManyToMany
    private Set<Event> events;
}
