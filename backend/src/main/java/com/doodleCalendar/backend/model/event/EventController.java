package com.doodleCalendar.backend.model.event;

import com.doodleCalendar.backend.model.event.dto.EventOutputDto;
import org.hibernate.event.spi.EventManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventMapper eventMapper;

    private Long testUserId = 0L;

    @GetMapping(value = {"/", ""})
    public List<EventOutputDto> getEventsList() {
        List<Event> events = this.eventRepository.findAllByAuthorId(this.testUserId);
        return events.stream().map(x -> .OneTimeBusynessOutput(x)).toList();
    }

    @GetMapping("/{eventId}")
    public Event getEventInfo(@PathVariable Long eventId) {
//        return "concrete event for " + eventId;
        Optional<Event> ev = this.eventRepository.findById(eventId);
        if (ev.isPresent()) {
            return ev.get();
        } else {
            throw new HttpClientErrorException(HttpStatusCode.valueOf(400), "resource not found");
        }
    }

    @PostMapping(value = { "/", "" })
    public String createEvent() {
        return "concrete event info1";
    }

    @PostMapping("/{eventId}")
    public String updateEvent() {
        return "";
    }

    @DeleteMapping("{eventId}")
    public String deleteEvent() {
        return "";
    }

    @PostMapping("{eventId}/hide")
    public String hideEvent() {
        return "";
    }

}
