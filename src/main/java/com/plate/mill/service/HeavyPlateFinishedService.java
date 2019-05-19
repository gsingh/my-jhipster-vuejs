package com.plate.mill.service;

import com.plate.mill.domain.HeavyPlateFinished;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link HeavyPlateFinished}.
 */
public interface HeavyPlateFinishedService {

    /**
     * Save a heavyPlateFinished.
     *
     * @param heavyPlateFinished the entity to save.
     * @return the persisted entity.
     */
    HeavyPlateFinished save(HeavyPlateFinished heavyPlateFinished);

    /**
     * Get all the heavyPlateFinisheds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HeavyPlateFinished> findAll(Pageable pageable);


    /**
     * Get the "id" heavyPlateFinished.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HeavyPlateFinished> findOne(Long id);

    /**
     * Delete the "id" heavyPlateFinished.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the heavyPlateFinished corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HeavyPlateFinished> search(String query, Pageable pageable);
}
