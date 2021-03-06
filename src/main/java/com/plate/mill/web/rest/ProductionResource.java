package com.plate.mill.web.rest;

import com.plate.mill.domain.Production;
import com.plate.mill.service.ProductionService;
import com.plate.mill.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.plate.mill.domain.Production}.
 */
@RestController
@RequestMapping("/api")
public class ProductionResource {

    private final Logger log = LoggerFactory.getLogger(ProductionResource.class);

    private static final String ENTITY_NAME = "production";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductionService productionService;

    public ProductionResource(ProductionService productionService) {
        this.productionService = productionService;
    }

    /**
     * {@code POST  /productions} : Create a new production.
     *
     * @param production the production to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new production, or with status {@code 400 (Bad Request)} if the production has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productions")
    public ResponseEntity<Production> createProduction(@Valid @RequestBody Production production) throws URISyntaxException {
        log.debug("REST request to save Production : {}", production);
        if (production.getId() != null) {
            throw new BadRequestAlertException("A new production cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Production result = productionService.save(production);
        return ResponseEntity.created(new URI("/api/productions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productions} : Updates an existing production.
     *
     * @param production the production to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated production,
     * or with status {@code 400 (Bad Request)} if the production is not valid,
     * or with status {@code 500 (Internal Server Error)} if the production couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productions")
    public ResponseEntity<Production> updateProduction(@Valid @RequestBody Production production) throws URISyntaxException {
        log.debug("REST request to update Production : {}", production);
        if (production.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Production result = productionService.save(production);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, production.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productions} : get all the productions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productions in body.
     */
    @GetMapping("/productions")
    public ResponseEntity<List<Production>> getAllProductions(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Productions");
        Page<Production> page = productionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /productions/:id} : get the "id" production.
     *
     * @param id the id of the production to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the production, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productions/{id}")
    public ResponseEntity<Production> getProduction(@PathVariable Long id) {
        log.debug("REST request to get Production : {}", id);
        Optional<Production> production = productionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(production);
    }

    /**
     * {@code DELETE  /productions/:id} : delete the "id" production.
     *
     * @param id the id of the production to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productions/{id}")
    public ResponseEntity<Void> deleteProduction(@PathVariable Long id) {
        log.debug("REST request to delete Production : {}", id);
        productionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/productions?query=:query} : search for the production corresponding
     * to the query.
     *
     * @param query the query of the production search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/productions")
    public ResponseEntity<List<Production>> searchProductions(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of Productions for query {}", query);
        Page<Production> page = productionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
