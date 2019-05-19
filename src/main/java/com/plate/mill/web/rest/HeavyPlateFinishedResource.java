package com.plate.mill.web.rest;

import com.plate.mill.domain.HeavyPlateFinished;
import com.plate.mill.service.HeavyPlateFinishedService;
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
 * REST controller for managing {@link com.plate.mill.domain.HeavyPlateFinished}.
 */
@RestController
@RequestMapping("/api")
public class HeavyPlateFinishedResource {

    private final Logger log = LoggerFactory.getLogger(HeavyPlateFinishedResource.class);

    private static final String ENTITY_NAME = "heavyPlateFinished";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HeavyPlateFinishedService heavyPlateFinishedService;

    public HeavyPlateFinishedResource(HeavyPlateFinishedService heavyPlateFinishedService) {
        this.heavyPlateFinishedService = heavyPlateFinishedService;
    }

    /**
     * {@code POST  /heavy-plate-finisheds} : Create a new heavyPlateFinished.
     *
     * @param heavyPlateFinished the heavyPlateFinished to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new heavyPlateFinished, or with status {@code 400 (Bad Request)} if the heavyPlateFinished has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/heavy-plate-finisheds")
    public ResponseEntity<HeavyPlateFinished> createHeavyPlateFinished(@Valid @RequestBody HeavyPlateFinished heavyPlateFinished) throws URISyntaxException {
        log.debug("REST request to save HeavyPlateFinished : {}", heavyPlateFinished);
        if (heavyPlateFinished.getId() != null) {
            throw new BadRequestAlertException("A new heavyPlateFinished cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HeavyPlateFinished result = heavyPlateFinishedService.save(heavyPlateFinished);
        return ResponseEntity.created(new URI("/api/heavy-plate-finisheds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /heavy-plate-finisheds} : Updates an existing heavyPlateFinished.
     *
     * @param heavyPlateFinished the heavyPlateFinished to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated heavyPlateFinished,
     * or with status {@code 400 (Bad Request)} if the heavyPlateFinished is not valid,
     * or with status {@code 500 (Internal Server Error)} if the heavyPlateFinished couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/heavy-plate-finisheds")
    public ResponseEntity<HeavyPlateFinished> updateHeavyPlateFinished(@Valid @RequestBody HeavyPlateFinished heavyPlateFinished) throws URISyntaxException {
        log.debug("REST request to update HeavyPlateFinished : {}", heavyPlateFinished);
        if (heavyPlateFinished.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HeavyPlateFinished result = heavyPlateFinishedService.save(heavyPlateFinished);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, heavyPlateFinished.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /heavy-plate-finisheds} : get all the heavyPlateFinisheds.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of heavyPlateFinisheds in body.
     */
    @GetMapping("/heavy-plate-finisheds")
    public ResponseEntity<List<HeavyPlateFinished>> getAllHeavyPlateFinisheds(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of HeavyPlateFinisheds");
        Page<HeavyPlateFinished> page = heavyPlateFinishedService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /heavy-plate-finisheds/:id} : get the "id" heavyPlateFinished.
     *
     * @param id the id of the heavyPlateFinished to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the heavyPlateFinished, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/heavy-plate-finisheds/{id}")
    public ResponseEntity<HeavyPlateFinished> getHeavyPlateFinished(@PathVariable Long id) {
        log.debug("REST request to get HeavyPlateFinished : {}", id);
        Optional<HeavyPlateFinished> heavyPlateFinished = heavyPlateFinishedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(heavyPlateFinished);
    }

    /**
     * {@code DELETE  /heavy-plate-finisheds/:id} : delete the "id" heavyPlateFinished.
     *
     * @param id the id of the heavyPlateFinished to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/heavy-plate-finisheds/{id}")
    public ResponseEntity<Void> deleteHeavyPlateFinished(@PathVariable Long id) {
        log.debug("REST request to delete HeavyPlateFinished : {}", id);
        heavyPlateFinishedService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/heavy-plate-finisheds?query=:query} : search for the heavyPlateFinished corresponding
     * to the query.
     *
     * @param query the query of the heavyPlateFinished search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/heavy-plate-finisheds")
    public ResponseEntity<List<HeavyPlateFinished>> searchHeavyPlateFinisheds(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of HeavyPlateFinisheds for query {}", query);
        Page<HeavyPlateFinished> page = heavyPlateFinishedService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
