package com.doodleCalendar.backend.modules.event;

import com.doodleCalendar.backend.modules.event.eventDTO.MonthBoundaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Year;
import java.time.YearMonth;
import java.util.List;
import java.util.Set;

@Service
public class CalendarService {
    @Autowired
    private EventRepository eventRepository;

    MonthBoundaryDto getMonthBoundaries(int idMonth) {
        int currentYear = Year.now().getValue();
        YearMonth yearMonth = YearMonth.of(currentYear, idMonth);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        LocalDateTime weekBeforeStart = startOfMonth.minusWeeks(1);
        LocalDateTime weekAfterEnd = endOfMonth.plusWeeks(1);

        return new MonthBoundaryDto(weekBeforeStart, weekAfterEnd);
    }

    public List<Event> getEventsWithMeForMonth(int idMonth, Long userId) {
        var monthBoundaries = getMonthBoundaries(idMonth);
        return eventRepository.findEventsWithMemberAndBetween(userId, monthBoundaries.weekBeforeStart, monthBoundaries.weekAfterEnd);
    }

    public List<Event> getEventsForMonthRoomsFilter(int idMonth, Set<String> roomValues) {
        var monthBoundaries = getMonthBoundaries(idMonth);
        return eventRepository.findEventsWithRoomsAndBetween(roomValues, monthBoundaries.weekBeforeStart, monthBoundaries.weekAfterEnd);
    }
}
