package com.plate.mill.service.impl;

import com.plate.mill.service.ShiftManagerService;
import com.plate.mill.domain.ShiftManager;
import com.plate.mill.repository.ShiftManagerRepository;
import com.plate.mill.repository.search.ShiftManagerSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link ShiftManager}.
 */
@Service
@Transactional
public class ShiftManagerServiceImpl implements ShiftManagerService {

    private final Logger log = LoggerFactory.getLogger(ShiftManagerServiceImpl.class);

    private final ShiftManagerRepository shiftManagerRepository;

    private final ShiftManagerSearchRepository shiftManagerSearchRepository;

    public ShiftManagerServiceImpl(ShiftManagerRepository shiftManagerRepository, ShiftManagerSearchRepository shiftManagerSearchRepository) {
        this.shiftManagerRepository = shiftManagerRepository;
        this.shiftManagerSearchRepository = shiftManagerSearchRepository;
    }

    /**
     * Save a shiftManager.
     *
     * @param shiftManager the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ShiftManager save(ShiftManager shiftManager) {
        log.debug("Request to save ShiftManager : {}", shiftManager);
        ShiftManager result = shiftManagerRepository.save(shiftManager);
        shiftManagerSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the shiftManagers.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ShiftManager> findAll() {
        log.debug("Request to get all ShiftManagers");
        return shiftManagerRepository.findAll();
    }


    /**
     * Get one shiftManager by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ShiftManager> findOne(Long id) {
        log.debug("Request to get ShiftManager : {}", id);
        return shiftManagerRepository.findById(id);
    }

    /**
     * Delete the shiftManager by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ShiftManager : {}", id);
        shiftManagerRepository.deleteById(id);
        shiftManagerSearchRepository.deleteById(id);
    }

    /**
     * Search for the shiftManager corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ShiftManager> search(String query) {
        log.debug("Request to search ShiftManagers for query {}", query);
        return StreamSupport
            .stream(shiftManagerSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
