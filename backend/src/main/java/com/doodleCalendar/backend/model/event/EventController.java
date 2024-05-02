package com.doodleCalendar.backend.model.event;

import com.doodleCalendar.backend.model.event.eventDTO.CreateEventInputDto;
import com.doodleCalendar.backend.model.event.eventDTO.EventInfoOutputDto;
import com.doodleCalendar.backend.model.event.eventDTO.EventOutputDto;
import com.doodleCalendar.backend.model.event.eventDTO.UpdateEventInputDto;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    @Autowired
    private EventService eventService;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventMapper eventMapper;
    private Long testUserId = 0L; // todo: когда сделаем авторизацию будем получать id исходя из токена/сессии в запросе

    @GetMapping("/my")
    public List<EventOutputDto> getMyEvents() {
        List<Event> events = this.eventRepository.findAllByAuthorId(this.testUserId);
        return events.stream().map(ev -> this.eventMapper.eventOutput(ev)).toList();
    }
    @GetMapping("/withMe")
    public List<EventOutputDto> getEventsWithMe() {
        List<Event> events = this.eventRepository.findAllByAuthorId(this.testUserId);
        return events.stream().map(ev -> this.eventMapper.eventOutput(ev)).toList();
    }
    @GetMapping("/{eventId}")
    public ResponseEntity<EventInfoOutputDto> getEventInfo(@PathVariable Long eventId) {
        return this.eventService.getEventInfo(eventId);
    }
    @PostMapping
    public void createEvent(@RequestBody() CreateEventInputDto createEventDto) {
        this.eventService.createEvent(createEventDto);
    }
    @DeleteMapping("/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        this.eventRepository.deleteById(eventId);
    }
    @PostMapping("/{eventId}")
    public void updateEvent(@RequestBody() UpdateEventInputDto updateEventDto, @PathVariable Long eventId) {
        this.eventService.updateEvent(eventId, updateEventDto);
    }
    @PostMapping("/{eventId}/hide")
    public void hideEvent(@PathVariable Long eventId) {
        this.eventService.hideEvent(eventId);
    }
    @PostMapping("/{eventId}/show")
    public void showEvent(@PathVariable Long eventId) {
        this.eventService.showEvent(eventId);
    }
}
