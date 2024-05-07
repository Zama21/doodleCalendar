package com.doodleCalendar.backend.modules.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private EventRepository eventRepository;

    public Set<Room> getFreeRooms(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return new HashSet<>();
    }

}
