package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.event.eventDTO.*;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public Set<EventOutputDto> getMyEvents() {
        Set<Event> events = eventRepository.findAllByAuthorId(testUserId);
        return events.stream().map(ev -> eventMapper.eventOutput(ev)).collect(Collectors.toSet());
    }
    @GetMapping("/withMe")
    public Set<EventOutputDto> getEventsWithMe() {
        Set<Event> events = eventRepository.findEventsWithMember(testUserId);
        return events.stream().map(ev -> eventMapper.eventOutput(ev)).collect(Collectors.toSet());
    }
    @GetMapping("/{eventId}")
    public EventInfoOutputDto getEventInfo(@PathVariable Long eventId) {
        return eventService.getEventInfo(eventId);
    }
    @PostMapping
    public void createEvent(@RequestBody() CreateEventInputDto createEventDto) {
        eventService.createEvent(createEventDto);
    }
    @DeleteMapping("/{eventId}")
    public void deleteEvent(@PathVariable Long eventId) {
        eventRepository.deleteById(eventId);
    }
    @PostMapping("/{eventId}")
    public void updateEvent(@RequestBody() UpdateEventInputDto updateEventDto, @PathVariable Long eventId) {
        eventService.updateEvent(eventId, updateEventDto);
    }
    @PostMapping("/{eventId}/hide")
    public void hideEvent(@PathVariable Long eventId) {
        eventService.hideEvent(eventId);
    }
    @PostMapping("/{eventId}/show")
    public void showEvent(@PathVariable Long eventId) {
        eventService.showEvent(eventId);
    }

    @GetMapping("/{monthId}")
    public List<EventForMonthOutputDTO> getEventForMonth(@PathVariable int monthId){
        return eventService.getEventForMonth(monthId);
    }


}
