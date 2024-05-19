package com.doodleCalendar.backend.modules.busyness;

import com.doodleCalendar.backend.modules.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(indexes = {
        @Index(columnList = "startDate, startTime")
})
@Getter
@Setter
@NoArgsConstructor
public class Busyness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer repeatWeekDay;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
