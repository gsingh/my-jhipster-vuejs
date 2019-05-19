package com.plate.mill.service;

import com.plate.mill.domain.VideoOfEvent;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link VideoOfEvent}.
 */
public interface VideoOfEventService {

    /**
     * Save a videoOfEvent.
     *
     * @param videoOfEvent the entity to save.
     * @return the persisted entity.
     */
    VideoOfEvent save(VideoOfEvent videoOfEvent);

    /**
     * Get all the videoOfEvents.
     *
     * @return the list of entities.
     */
    List<VideoOfEvent> findAll();


    /**
     * Get the "id" videoOfEvent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VideoOfEvent> findOne(Long id);

    /**
     * Delete the "id" videoOfEvent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the videoOfEvent corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<VideoOfEvent> search(String query);
}
