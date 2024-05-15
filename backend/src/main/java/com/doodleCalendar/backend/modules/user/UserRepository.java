package com.doodleCalendar.backend.modules.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Set<User> findByIdIn(Set<Long> ids);
}
