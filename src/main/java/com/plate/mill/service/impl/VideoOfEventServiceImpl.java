package com.plate.mill.service.impl;

import com.plate.mill.service.VideoOfEventService;
import com.plate.mill.domain.VideoOfEvent;
import com.plate.mill.repository.VideoOfEventRepository;
import com.plate.mill.repository.search.VideoOfEventSearchRepository;
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
 * Service Implementation for managing {@link VideoOfEvent}.
 */
@Service
@Transactional
public class VideoOfEventServiceImpl implements VideoOfEventService {

    private final Logger log = LoggerFactory.getLogger(VideoOfEventServiceImpl.class);

    private final VideoOfEventRepository videoOfEventRepository;

    private final VideoOfEventSearchRepository videoOfEventSearchRepository;

    public VideoOfEventServiceImpl(VideoOfEventRepository videoOfEventRepository, VideoOfEventSearchRepository videoOfEventSearchRepository) {
        this.videoOfEventRepository = videoOfEventRepository;
        this.videoOfEventSearchRepository = videoOfEventSearchRepository;
    }

    /**
     * Save a videoOfEvent.
     *
     * @param videoOfEvent the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VideoOfEvent save(VideoOfEvent videoOfEvent) {
        log.debug("Request to save VideoOfEvent : {}", videoOfEvent);
        VideoOfEvent result = videoOfEventRepository.save(videoOfEvent);
        videoOfEventSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the videoOfEvents.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<VideoOfEvent> findAll() {
        log.debug("Request to get all VideoOfEvents");
        return videoOfEventRepository.findAll();
    }


    /**
     * Get one videoOfEvent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VideoOfEvent> findOne(Long id) {
        log.debug("Request to get VideoOfEvent : {}", id);
        return videoOfEventRepository.findById(id);
    }

    /**
     * Delete the videoOfEvent by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VideoOfEvent : {}", id);
        videoOfEventRepository.deleteById(id);
        videoOfEventSearchRepository.deleteById(id);
    }

    /**
     * Search for the videoOfEvent corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<VideoOfEvent> search(String query) {
        log.debug("Request to search VideoOfEvents for query {}", query);
        return StreamSupport
            .stream(videoOfEventSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
