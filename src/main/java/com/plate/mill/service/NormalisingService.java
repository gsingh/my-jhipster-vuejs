package com.plate.mill.service;

import com.plate.mill.domain.Normalising;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Normalising}.
 */
public interface NormalisingService {

    /**
     * Save a normalising.
     *
     * @param normalising the entity to save.
     * @return the persisted entity.
     */
    Normalising save(Normalising normalising);

    /**
     * Get all the normalisings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Normalising> findAll(Pageable pageable);


    /**
     * Get the "id" normalising.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Normalising> findOne(Long id);

    /**
     * Delete the "id" normalising.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the normalising corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Normalising> search(String query, Pageable pageable);
}
