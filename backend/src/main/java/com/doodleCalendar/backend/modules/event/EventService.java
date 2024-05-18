package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.event.eventDTO.CreateEventInputDto;
import com.doodleCalendar.backend.modules.event.eventDTO.EventForMonthOutputDTO;
import com.doodleCalendar.backend.modules.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.modules.event.eventDTO.UpdateEventInputDto;
import com.doodleCalendar.backend.exception.types.NoSuchEventException;
import com.doodleCalendar.backend.modules.user.User;
import com.doodleCalendar.backend.modules.user.UserRepository;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
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
        Set<Room> rooms = roomRepository.findByValueIn(createEventDto.rooms);
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

    public List<EventForMonthOutputDTO> getEventForMonth(int idMonth){
        int currentYear = Year.now().getValue();
        YearMonth yearMonth = YearMonth.of(currentYear, idMonth);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        LocalDateTime weekBeforeStart = startOfMonth.minusWeeks(1);
        LocalDateTime weekAfterEnd = endOfMonth.plusWeeks(1);

        List<Event> events = eventRepository.findByStartsAtBetween(weekBeforeStart, weekAfterEnd);
        return events.stream().map(x -> eventMapper.eventToEventForMonthOutputDTO(x)).toList();
    }


}
