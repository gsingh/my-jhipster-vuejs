package com.plate.mill.service.impl;

import com.plate.mill.service.ShippingService;
import com.plate.mill.domain.Shipping;
import com.plate.mill.repository.ShippingRepository;
import com.plate.mill.repository.search.ShippingSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Shipping}.
 */
@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final Logger log = LoggerFactory.getLogger(ShippingServiceImpl.class);

    private final ShippingRepository shippingRepository;

    private final ShippingSearchRepository shippingSearchRepository;

    public ShippingServiceImpl(ShippingRepository shippingRepository, ShippingSearchRepository shippingSearchRepository) {
        this.shippingRepository = shippingRepository;
        this.shippingSearchRepository = shippingSearchRepository;
    }

    /**
     * Save a shipping.
     *
     * @param shipping the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Shipping save(Shipping shipping) {
        log.debug("Request to save Shipping : {}", shipping);
        Shipping result = shippingRepository.save(shipping);
        shippingSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the shippings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Shipping> findAll(Pageable pageable) {
        log.debug("Request to get all Shippings");
        return shippingRepository.findAll(pageable);
    }


    /**
     * Get one shipping by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Shipping> findOne(Long id) {
        log.debug("Request to get Shipping : {}", id);
        return shippingRepository.findById(id);
    }

    /**
     * Delete the shipping by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shipping : {}", id);
        shippingRepository.deleteById(id);
        shippingSearchRepository.deleteById(id);
    }

    /**
     * Search for the shipping corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Shipping> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Shippings for query {}", query);
        return shippingSearchRepository.search(queryStringQuery(query), pageable);    }
}
