package com.plate.mill.service;

import com.plate.mill.domain.PictureOfEvent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link PictureOfEvent}.
 */
public interface PictureOfEventService {

    /**
     * Save a pictureOfEvent.
     *
     * @param pictureOfEvent the entity to save.
     * @return the persisted entity.
     */
    PictureOfEvent save(PictureOfEvent pictureOfEvent);

    /**
     * Get all the pictureOfEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PictureOfEvent> findAll(Pageable pageable);


    /**
     * Get the "id" pictureOfEvent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PictureOfEvent> findOne(Long id);

    /**
     * Delete the "id" pictureOfEvent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the pictureOfEvent corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PictureOfEvent> search(String query, Pageable pageable);
}
