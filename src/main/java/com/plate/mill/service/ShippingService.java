package com.plate.mill.service;

import com.plate.mill.domain.Shipping;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Shipping}.
 */
public interface ShippingService {

    /**
     * Save a shipping.
     *
     * @param shipping the entity to save.
     * @return the persisted entity.
     */
    Shipping save(Shipping shipping);

    /**
     * Get all the shippings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Shipping> findAll(Pageable pageable);


    /**
     * Get the "id" shipping.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Shipping> findOne(Long id);

    /**
     * Delete the "id" shipping.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the shipping corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Shipping> search(String query, Pageable pageable);
}
