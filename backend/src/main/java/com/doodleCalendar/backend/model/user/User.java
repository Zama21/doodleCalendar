package com.doodleCalendar.backend.model.user;

import com.doodleCalendar.backend.model.busyness.Busyness;
import com.doodleCalendar.backend.model.event.Event;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@JsonSerialize()
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
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "members")
    private Set<Event> events;

    public Boolean isBusyDuring(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return busynesses.stream().anyMatch(busyness -> {
            if (busyness.getRepeatWeekDay() == null) {
                LocalDateTime busynessStart = LocalDateTime.of(busyness.getStartDate(), busyness.getStartTime());
                LocalDateTime busynessEnd = LocalDateTime.of(busyness.getEndDate(), busyness.getEndTime());
                return busynessEnd.isAfter(startDateTime) && busynessStart.isBefore(endDateTime);
            } else {
                Integer weekDayNumber = busyness.getRepeatWeekDay();
                DayOfWeek repeatWeekday = DayOfWeek.of(weekDayNumber + 1);

                LocalDateTime currentDateTime = startDateTime;
                while (currentDateTime.isBefore(endDateTime)) {
                    if (currentDateTime.getDayOfWeek() == repeatWeekday) {
                        LocalTime startTime = startDateTime.toLocalTime();
                        LocalTime endTime = endDateTime.toLocalTime();

                        if (currentDateTime.isAfter(startDateTime)) {
                            startTime = LocalTime.of(0, 0, 0);
                        }
                        if (currentDateTime.isBefore(endDateTime)) {
                            endTime = LocalTime.of(23, 59, 59);
                        }

                        return busyness.getEndTime().isAfter(startTime) && busyness.getStartTime().isBefore(endTime);
                    }
                    currentDateTime = currentDateTime.plusDays(1);
                }
                return false;
            }
        });
    }
}
