package com.doodleCalendar.backend.modules.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

//@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
