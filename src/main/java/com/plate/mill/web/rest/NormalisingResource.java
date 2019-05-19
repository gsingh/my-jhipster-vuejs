package com.plate.mill.web.rest;

import com.plate.mill.domain.Normalising;
import com.plate.mill.service.NormalisingService;
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
 * REST controller for managing {@link com.plate.mill.domain.Normalising}.
 */
@RestController
@RequestMapping("/api")
public class NormalisingResource {

    private final Logger log = LoggerFactory.getLogger(NormalisingResource.class);

    private static final String ENTITY_NAME = "normalising";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NormalisingService normalisingService;

    public NormalisingResource(NormalisingService normalisingService) {
        this.normalisingService = normalisingService;
    }

    /**
     * {@code POST  /normalisings} : Create a new normalising.
     *
     * @param normalising the normalising to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new normalising, or with status {@code 400 (Bad Request)} if the normalising has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/normalisings")
    public ResponseEntity<Normalising> createNormalising(@Valid @RequestBody Normalising normalising) throws URISyntaxException {
        log.debug("REST request to save Normalising : {}", normalising);
        if (normalising.getId() != null) {
            throw new BadRequestAlertException("A new normalising cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Normalising result = normalisingService.save(normalising);
        return ResponseEntity.created(new URI("/api/normalisings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /normalisings} : Updates an existing normalising.
     *
     * @param normalising the normalising to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated normalising,
     * or with status {@code 400 (Bad Request)} if the normalising is not valid,
     * or with status {@code 500 (Internal Server Error)} if the normalising couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/normalisings")
    public ResponseEntity<Normalising> updateNormalising(@Valid @RequestBody Normalising normalising) throws URISyntaxException {
        log.debug("REST request to update Normalising : {}", normalising);
        if (normalising.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Normalising result = normalisingService.save(normalising);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, normalising.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /normalisings} : get all the normalisings.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of normalisings in body.
     */
    @GetMapping("/normalisings")
    public ResponseEntity<List<Normalising>> getAllNormalisings(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Normalisings");
        Page<Normalising> page = normalisingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /normalisings/:id} : get the "id" normalising.
     *
     * @param id the id of the normalising to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the normalising, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/normalisings/{id}")
    public ResponseEntity<Normalising> getNormalising(@PathVariable Long id) {
        log.debug("REST request to get Normalising : {}", id);
        Optional<Normalising> normalising = normalisingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(normalising);
    }

    /**
     * {@code DELETE  /normalisings/:id} : delete the "id" normalising.
     *
     * @param id the id of the normalising to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/normalisings/{id}")
    public ResponseEntity<Void> deleteNormalising(@PathVariable Long id) {
        log.debug("REST request to delete Normalising : {}", id);
        normalisingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/normalisings?query=:query} : search for the normalising corresponding
     * to the query.
     *
     * @param query the query of the normalising search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/normalisings")
    public ResponseEntity<List<Normalising>> searchNormalisings(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of Normalisings for query {}", query);
        Page<Normalising> page = normalisingService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
