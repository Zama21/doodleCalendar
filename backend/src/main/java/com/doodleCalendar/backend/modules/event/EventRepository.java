package com.doodleCalendar.backend.modules.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Set;

//@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Set<Event> findAllByAuthorId(Long authorId);

    @Query("SELECT e FROM Event e JOIN e.members m ON m.id = :memberId")
    Set<Event> findEventsWithMember(@Param("memberId") Long memberId);

    @Query("SELECT e FROM Event e WHERE e.ends_at >= :start AND e.starts_at <= :end")
    Set<Event> findEventsDuring(@Param("start") LocalDateTime startDateTime, @Param("end") LocalDateTime endDateTime);
    @Query("SELECT r FROM Event e JOIN e.rooms r ON r.event_id = e.id WHERE e.ends_at >= :start AND e.starts_at <= :end")
    Set<Room> findBusyRoomsDuring(@Param("start") LocalDateTime startDateTime, @Param("end") LocalDateTime endDateTime);
}
