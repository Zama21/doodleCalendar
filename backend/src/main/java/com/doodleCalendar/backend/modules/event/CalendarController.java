package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.event.eventDTO.calendar.EventForMonthOutputDTO;
import com.doodleCalendar.backend.modules.event.eventDTO.calendar.EventForMonthWithRoomsOutputDTO;
import com.doodleCalendar.backend.utils.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @Autowired
    private EventMapper eventMapper;

    @GetMapping("/events/{monthId}")
    public List<EventForMonthOutputDTO> getEventForMonth(@PathVariable int monthId) {
        var events = calendarService.getEventsWithMeForMonth(monthId, 0L);
        return events.stream().map(event -> eventMapper.eventToEventForMonthOutputDTO(event)).toList();
    }

    @GetMapping("/events/{monthId}/roomsFilter")
    public List<EventForMonthWithRoomsOutputDTO> getEventsForMonthRoomsFiltered(@PathVariable int monthId, @RequestParam(name = "rooms") String rooms) {
        Set<String> roomValues = Arrays.stream(rooms.split(",")).map(value -> value.trim()).collect(Collectors.toSet());
        var events = calendarService.getEventsForMonthRoomsFilter(monthId, roomValues);
        return events.stream().map(event -> eventMapper.eventToEventForMonthWithRoomsOutputDTO(event)).toList();
    }
}
