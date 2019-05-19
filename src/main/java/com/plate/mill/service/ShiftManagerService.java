package com.plate.mill.service;

import com.plate.mill.domain.ShiftManager;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ShiftManager}.
 */
public interface ShiftManagerService {

    /**
     * Save a shiftManager.
     *
     * @param shiftManager the entity to save.
     * @return the persisted entity.
     */
    ShiftManager save(ShiftManager shiftManager);

    /**
     * Get all the shiftManagers.
     *
     * @return the list of entities.
     */
    List<ShiftManager> findAll();


    /**
     * Get the "id" shiftManager.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ShiftManager> findOne(Long id);

    /**
     * Delete the "id" shiftManager.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the shiftManager corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<ShiftManager> search(String query);
}
