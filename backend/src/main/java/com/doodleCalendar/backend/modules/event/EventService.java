package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.event.eventDTO.CreateEventInputDto;
import com.doodleCalendar.backend.modules.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.modules.event.eventDTO.UpdateEventInputDto;
import com.doodleCalendar.backend.exception.types.NoSuchEventException;
import com.doodleCalendar.backend.modules.user.User;
import com.doodleCalendar.backend.modules.user.UserRepository;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private EventMapper eventMapper;
    public void hideEvent(Long eventId) {
        setEventHidden(eventId, true);
    }
    public void showEvent(Long eventId) {
        setEventHidden(eventId, false);
    }

    public void createEvent(CreateEventInputDto createEventDto) {
        Event newEvent = eventMapper.createEventDtoToEntity(createEventDto);
        Set<User> members = userRepository.findByIdIn(createEventDto.membersIds);
        newEvent.setMembers(members);
        Set<Room> rooms = roomRepository.findByValueIn(newEvent.rooms);
        newEvent.setRooms(rooms);
        eventRepository.save(newEvent);
    }

    public void updateEvent(Long eventId, UpdateEventInputDto updateEventDto) {
        Event updatedEvent = eventMapper.updateEventDtoToEntity(updateEventDto);
        updatedEvent.setId(eventId);
        Set<User> members = userRepository.findByIdIn(updateEventDto.membersIds);
        updatedEvent.setMembers(members);
        Set<Room> rooms = roomRepository.findByValueIn(updateEventDto.rooms);
        updatedEvent.setRooms(rooms);
        eventRepository.save(updatedEvent);
    }

    public EventInfoOutputDto getEventInfo(Long eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(NoSuchEventException::new);
        return eventMapper.eventInfoOutput(event);
    }

    private void setEventHidden(Long eventId, boolean isHidden) {
        Event event = eventRepository.findById(eventId).orElseThrow(NoSuchEventException::new);
        event.setIsHidden(isHidden);
        eventRepository.save(event);
    }




}
