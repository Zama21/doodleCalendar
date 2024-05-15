package com.doodleCalendar.backend.modules.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private EventRepository eventRepository;

    public Set<Room> getFreeRooms(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        var allRooms = roomRepository.findAll();
        Set<Room> busyRooms = eventRepository.findBusyRoomsDuring(startDateTime, endDateTime);

        return allRooms.stream().filter(room -> busyRooms.stream().noneMatch(busyRoom -> busyRoom.getValue().equals(room.getValue()))).collect(Collectors.toSet());
    }

}
