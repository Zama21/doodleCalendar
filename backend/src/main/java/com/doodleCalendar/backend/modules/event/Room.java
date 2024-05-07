package com.doodleCalendar.backend.modules.event;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(indexes = @Index(columnList = "value"))
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;
}
