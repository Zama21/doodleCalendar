package com.doodleCalendar.backend.model.event;

import com.doodleCalendar.backend.model.event.eventDTO.CreateEventInputDto;
import com.doodleCalendar.backend.model.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.model.event.eventDTO.UpdateEventInputDto;
import com.doodleCalendar.backend.exception.types.NoSuchEventException;
import com.doodleCalendar.backend.model.user.User;
import com.doodleCalendar.backend.model.user.UserRepository;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventMapper eventMapper;
    public void hideEvent(Long eventId) {
        this.setEventHidden(eventId, true);
    }
    public void showEvent(Long eventId) {
        this.setEventHidden(eventId, false);
    }

    public void createEvent(CreateEventInputDto createEventDto) {
        Event newEvent = eventMapper.createEventDtoToEntity(createEventDto);
        Set<User> members = userRepository.findByIdIn(createEventDto.membersIds);
        newEvent.setMembers(members);
        this.eventRepository.save(newEvent);
    }

    public void updateEvent(Long eventId, UpdateEventInputDto updateEventDto) {
        Event updatedEvent = eventMapper.updateEventDtoToEntity(updateEventDto);
        updatedEvent.setId(eventId);
        Set<User> members = userRepository.findByIdIn(updateEventDto.membersIds);
        updatedEvent.setMembers(members);
        this.eventRepository.save(updatedEvent);
    }

    public ResponseEntity<EventInfoOutputDto> getEventInfo(Long eventId) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(NoSuchEventException::new);
        EventInfoOutputDto eventInfoOutputDto = this.eventMapper.eventInfoOutput(event);
        return ResponseEntity.ok(eventInfoOutputDto);
    }

    private void setEventHidden(Long eventId, boolean isHidden) {
        Event event = this.eventRepository.findById(eventId).orElseThrow(NoSuchEventException::new);
        event.setIsHidden(isHidden);
        this.eventRepository.save(event);
    }

}
