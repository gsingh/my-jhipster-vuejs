package com.plate.mill.service.impl;

import com.plate.mill.service.EventOfPlateMillService;
import com.plate.mill.domain.EventOfPlateMill;
import com.plate.mill.repository.EventOfPlateMillRepository;
import com.plate.mill.repository.search.EventOfPlateMillSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link EventOfPlateMill}.
 */
@Service
@Transactional
public class EventOfPlateMillServiceImpl implements EventOfPlateMillService {

    private final Logger log = LoggerFactory.getLogger(EventOfPlateMillServiceImpl.class);

    private final EventOfPlateMillRepository eventOfPlateMillRepository;

    private final EventOfPlateMillSearchRepository eventOfPlateMillSearchRepository;

    public EventOfPlateMillServiceImpl(EventOfPlateMillRepository eventOfPlateMillRepository, EventOfPlateMillSearchRepository eventOfPlateMillSearchRepository) {
        this.eventOfPlateMillRepository = eventOfPlateMillRepository;
        this.eventOfPlateMillSearchRepository = eventOfPlateMillSearchRepository;
    }

    /**
     * Save a eventOfPlateMill.
     *
     * @param eventOfPlateMill the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EventOfPlateMill save(EventOfPlateMill eventOfPlateMill) {
        log.debug("Request to save EventOfPlateMill : {}", eventOfPlateMill);
        EventOfPlateMill result = eventOfPlateMillRepository.save(eventOfPlateMill);
        eventOfPlateMillSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the eventOfPlateMills.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventOfPlateMill> findAll(Pageable pageable) {
        log.debug("Request to get all EventOfPlateMills");
        return eventOfPlateMillRepository.findAll(pageable);
    }


    /**
     * Get one eventOfPlateMill by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EventOfPlateMill> findOne(Long id) {
        log.debug("Request to get EventOfPlateMill : {}", id);
        return eventOfPlateMillRepository.findById(id);
    }

    /**
     * Delete the eventOfPlateMill by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EventOfPlateMill : {}", id);
        eventOfPlateMillRepository.deleteById(id);
        eventOfPlateMillSearchRepository.deleteById(id);
    }

    /**
     * Search for the eventOfPlateMill corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventOfPlateMill> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of EventOfPlateMills for query {}", query);
        return eventOfPlateMillSearchRepository.search(queryStringQuery(query), pageable);    }
}
