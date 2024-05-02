package com.doodleCalendar.backend.model.event;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByAuthorId(Long authorId);

    @Query("SELECT e FROM Event e JOIN e.members m WHERE m.id = :memberId")
    Set<Event> findEventsByMemberId(@Param("memberId") Long memberId);

}
