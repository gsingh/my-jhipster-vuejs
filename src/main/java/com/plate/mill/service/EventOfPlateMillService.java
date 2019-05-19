package com.plate.mill.service;

import com.plate.mill.domain.EventOfPlateMill;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link EventOfPlateMill}.
 */
public interface EventOfPlateMillService {

    /**
     * Save a eventOfPlateMill.
     *
     * @param eventOfPlateMill the entity to save.
     * @return the persisted entity.
     */
    EventOfPlateMill save(EventOfPlateMill eventOfPlateMill);

    /**
     * Get all the eventOfPlateMills.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EventOfPlateMill> findAll(Pageable pageable);


    /**
     * Get the "id" eventOfPlateMill.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EventOfPlateMill> findOne(Long id);

    /**
     * Delete the "id" eventOfPlateMill.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the eventOfPlateMill corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EventOfPlateMill> search(String query, Pageable pageable);
}
