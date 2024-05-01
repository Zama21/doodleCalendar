package com.doodleCalendar.backend.model.busyness;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusynessRepository extends JpaRepository<Busyness, Long> {

    List<Busyness> findAllByUserIdAndRepeatWeekDayIsNull(Long userId);

    List<Busyness> findAllByUserIdAndRepeatWeekDayIsNotNull(Long userId);
}
