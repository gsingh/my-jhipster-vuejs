package com.plate.mill.service.impl;

import com.plate.mill.service.ProductionService;
import com.plate.mill.domain.Production;
import com.plate.mill.repository.ProductionRepository;
import com.plate.mill.repository.search.ProductionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Production}.
 */
@Service
@Transactional
public class ProductionServiceImpl implements ProductionService {

    private final Logger log = LoggerFactory.getLogger(ProductionServiceImpl.class);

    private final ProductionRepository productionRepository;

    private final ProductionSearchRepository productionSearchRepository;

    public ProductionServiceImpl(ProductionRepository productionRepository, ProductionSearchRepository productionSearchRepository) {
        this.productionRepository = productionRepository;
        this.productionSearchRepository = productionSearchRepository;
    }

    /**
     * Save a production.
     *
     * @param production the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Production save(Production production) {
        log.debug("Request to save Production : {}", production);
        Production result = productionRepository.save(production);
        productionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the productions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Production> findAll(Pageable pageable) {
        log.debug("Request to get all Productions");
        return productionRepository.findAll(pageable);
    }


    /**
     * Get one production by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Production> findOne(Long id) {
        log.debug("Request to get Production : {}", id);
        return productionRepository.findById(id);
    }

    /**
     * Delete the production by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Production : {}", id);
        productionRepository.deleteById(id);
        productionSearchRepository.deleteById(id);
    }

    /**
     * Search for the production corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Production> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Productions for query {}", query);
        return productionSearchRepository.search(queryStringQuery(query), pageable);    }
}
