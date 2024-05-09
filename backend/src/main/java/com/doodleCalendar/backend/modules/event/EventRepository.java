package com.doodleCalendar.backend.modules.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Set;

//@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Set<Event> findAllByAuthorId(Long authorId);

    @Query("SELECT e FROM Event e JOIN e.members m WHERE m.id = :memberId")
    Set<Event> findEventsWithMember(@Param("memberId") Long memberId);

    @Query("SELECT e FROM Event e WHERE e.endsAt >= :start AND e.startsAt <= :end")
    Set<Event> findEventsDuring(@Param("start") LocalDateTime startDateTime, @Param("end") LocalDateTime endDateTime);
    @Query("SELECT DISTINCT r FROM Event e JOIN e.rooms r WHERE e.endsAt >= :start AND e.startsAt <= :end")
    Set<Room> findBusyRoomsDuring(@Param("start") LocalDateTime startDateTime, @Param("end") LocalDateTime endDateTime);
}
