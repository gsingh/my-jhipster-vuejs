package com.plate.mill.service.impl;

import com.plate.mill.service.HeavyPlateFinishedService;
import com.plate.mill.domain.HeavyPlateFinished;
import com.plate.mill.repository.HeavyPlateFinishedRepository;
import com.plate.mill.repository.search.HeavyPlateFinishedSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link HeavyPlateFinished}.
 */
@Service
@Transactional
public class HeavyPlateFinishedServiceImpl implements HeavyPlateFinishedService {

    private final Logger log = LoggerFactory.getLogger(HeavyPlateFinishedServiceImpl.class);

    private final HeavyPlateFinishedRepository heavyPlateFinishedRepository;

    private final HeavyPlateFinishedSearchRepository heavyPlateFinishedSearchRepository;

    public HeavyPlateFinishedServiceImpl(HeavyPlateFinishedRepository heavyPlateFinishedRepository, HeavyPlateFinishedSearchRepository heavyPlateFinishedSearchRepository) {
        this.heavyPlateFinishedRepository = heavyPlateFinishedRepository;
        this.heavyPlateFinishedSearchRepository = heavyPlateFinishedSearchRepository;
    }

    /**
     * Save a heavyPlateFinished.
     *
     * @param heavyPlateFinished the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HeavyPlateFinished save(HeavyPlateFinished heavyPlateFinished) {
        log.debug("Request to save HeavyPlateFinished : {}", heavyPlateFinished);
        HeavyPlateFinished result = heavyPlateFinishedRepository.save(heavyPlateFinished);
        heavyPlateFinishedSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the heavyPlateFinisheds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HeavyPlateFinished> findAll(Pageable pageable) {
        log.debug("Request to get all HeavyPlateFinisheds");
        return heavyPlateFinishedRepository.findAll(pageable);
    }


    /**
     * Get one heavyPlateFinished by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HeavyPlateFinished> findOne(Long id) {
        log.debug("Request to get HeavyPlateFinished : {}", id);
        return heavyPlateFinishedRepository.findById(id);
    }

    /**
     * Delete the heavyPlateFinished by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HeavyPlateFinished : {}", id);
        heavyPlateFinishedRepository.deleteById(id);
        heavyPlateFinishedSearchRepository.deleteById(id);
    }

    /**
     * Search for the heavyPlateFinished corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HeavyPlateFinished> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of HeavyPlateFinisheds for query {}", query);
        return heavyPlateFinishedSearchRepository.search(queryStringQuery(query), pageable);    }
}
