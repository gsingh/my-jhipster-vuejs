package com.plate.mill.service.impl;

import com.plate.mill.service.NormalisingService;
import com.plate.mill.domain.Normalising;
import com.plate.mill.repository.NormalisingRepository;
import com.plate.mill.repository.search.NormalisingSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Normalising}.
 */
@Service
@Transactional
public class NormalisingServiceImpl implements NormalisingService {

    private final Logger log = LoggerFactory.getLogger(NormalisingServiceImpl.class);

    private final NormalisingRepository normalisingRepository;

    private final NormalisingSearchRepository normalisingSearchRepository;

    public NormalisingServiceImpl(NormalisingRepository normalisingRepository, NormalisingSearchRepository normalisingSearchRepository) {
        this.normalisingRepository = normalisingRepository;
        this.normalisingSearchRepository = normalisingSearchRepository;
    }

    /**
     * Save a normalising.
     *
     * @param normalising the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Normalising save(Normalising normalising) {
        log.debug("Request to save Normalising : {}", normalising);
        Normalising result = normalisingRepository.save(normalising);
        normalisingSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the normalisings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Normalising> findAll(Pageable pageable) {
        log.debug("Request to get all Normalisings");
        return normalisingRepository.findAll(pageable);
    }


    /**
     * Get one normalising by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Normalising> findOne(Long id) {
        log.debug("Request to get Normalising : {}", id);
        return normalisingRepository.findById(id);
    }

    /**
     * Delete the normalising by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Normalising : {}", id);
        normalisingRepository.deleteById(id);
        normalisingSearchRepository.deleteById(id);
    }

    /**
     * Search for the normalising corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Normalising> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Normalisings for query {}", query);
        return normalisingSearchRepository.search(queryStringQuery(query), pageable);    }
}
