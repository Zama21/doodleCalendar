package com.doodleCalendar.backend.modules.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

//@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Set<Event> findAllByAuthorId(Long authorId);

    @Query("SELECT e FROM Event e JOIN e.members m WHERE m.id = :memberId")
    Set<Event> findEventsWithMember(@Param("memberId") Long memberId);

}
