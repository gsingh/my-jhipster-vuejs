package com.plate.mill.service.impl;

import com.plate.mill.service.PictureOfEventService;
import com.plate.mill.domain.PictureOfEvent;
import com.plate.mill.repository.PictureOfEventRepository;
import com.plate.mill.repository.search.PictureOfEventSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link PictureOfEvent}.
 */
@Service
@Transactional
public class PictureOfEventServiceImpl implements PictureOfEventService {

    private final Logger log = LoggerFactory.getLogger(PictureOfEventServiceImpl.class);

    private final PictureOfEventRepository pictureOfEventRepository;

    private final PictureOfEventSearchRepository pictureOfEventSearchRepository;

    public PictureOfEventServiceImpl(PictureOfEventRepository pictureOfEventRepository, PictureOfEventSearchRepository pictureOfEventSearchRepository) {
        this.pictureOfEventRepository = pictureOfEventRepository;
        this.pictureOfEventSearchRepository = pictureOfEventSearchRepository;
    }

    /**
     * Save a pictureOfEvent.
     *
     * @param pictureOfEvent the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PictureOfEvent save(PictureOfEvent pictureOfEvent) {
        log.debug("Request to save PictureOfEvent : {}", pictureOfEvent);
        PictureOfEvent result = pictureOfEventRepository.save(pictureOfEvent);
        pictureOfEventSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the pictureOfEvents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PictureOfEvent> findAll(Pageable pageable) {
        log.debug("Request to get all PictureOfEvents");
        return pictureOfEventRepository.findAll(pageable);
    }


    /**
     * Get one pictureOfEvent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PictureOfEvent> findOne(Long id) {
        log.debug("Request to get PictureOfEvent : {}", id);
        return pictureOfEventRepository.findById(id);
    }

    /**
     * Delete the pictureOfEvent by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PictureOfEvent : {}", id);
        pictureOfEventRepository.deleteById(id);
        pictureOfEventSearchRepository.deleteById(id);
    }

    /**
     * Search for the pictureOfEvent corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PictureOfEvent> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of PictureOfEvents for query {}", query);
        return pictureOfEventSearchRepository.search(queryStringQuery(query), pageable);    }
}
