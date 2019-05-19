package com.plate.mill.repository;

import com.plate.mill.domain.VideoOfEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VideoOfEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoOfEventRepository extends JpaRepository<VideoOfEvent, Long> {

}
