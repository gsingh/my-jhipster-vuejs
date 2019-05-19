package com.plate.mill.web.rest;

import com.plate.mill.domain.EventOfPlateMill;
import com.plate.mill.service.EventOfPlateMillService;
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
 * REST controller for managing {@link com.plate.mill.domain.EventOfPlateMill}.
 */
@RestController
@RequestMapping("/api")
public class EventOfPlateMillResource {

    private final Logger log = LoggerFactory.getLogger(EventOfPlateMillResource.class);

    private static final String ENTITY_NAME = "eventOfPlateMill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventOfPlateMillService eventOfPlateMillService;

    public EventOfPlateMillResource(EventOfPlateMillService eventOfPlateMillService) {
        this.eventOfPlateMillService = eventOfPlateMillService;
    }

    /**
     * {@code POST  /event-of-plate-mills} : Create a new eventOfPlateMill.
     *
     * @param eventOfPlateMill the eventOfPlateMill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eventOfPlateMill, or with status {@code 400 (Bad Request)} if the eventOfPlateMill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/event-of-plate-mills")
    public ResponseEntity<EventOfPlateMill> createEventOfPlateMill(@Valid @RequestBody EventOfPlateMill eventOfPlateMill) throws URISyntaxException {
        log.debug("REST request to save EventOfPlateMill : {}", eventOfPlateMill);
        if (eventOfPlateMill.getId() != null) {
            throw new BadRequestAlertException("A new eventOfPlateMill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventOfPlateMill result = eventOfPlateMillService.save(eventOfPlateMill);
        return ResponseEntity.created(new URI("/api/event-of-plate-mills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /event-of-plate-mills} : Updates an existing eventOfPlateMill.
     *
     * @param eventOfPlateMill the eventOfPlateMill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventOfPlateMill,
     * or with status {@code 400 (Bad Request)} if the eventOfPlateMill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eventOfPlateMill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/event-of-plate-mills")
    public ResponseEntity<EventOfPlateMill> updateEventOfPlateMill(@Valid @RequestBody EventOfPlateMill eventOfPlateMill) throws URISyntaxException {
        log.debug("REST request to update EventOfPlateMill : {}", eventOfPlateMill);
        if (eventOfPlateMill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventOfPlateMill result = eventOfPlateMillService.save(eventOfPlateMill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eventOfPlateMill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /event-of-plate-mills} : get all the eventOfPlateMills.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eventOfPlateMills in body.
     */
    @GetMapping("/event-of-plate-mills")
    public ResponseEntity<List<EventOfPlateMill>> getAllEventOfPlateMills(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of EventOfPlateMills");
        Page<EventOfPlateMill> page = eventOfPlateMillService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /event-of-plate-mills/:id} : get the "id" eventOfPlateMill.
     *
     * @param id the id of the eventOfPlateMill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eventOfPlateMill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/event-of-plate-mills/{id}")
    public ResponseEntity<EventOfPlateMill> getEventOfPlateMill(@PathVariable Long id) {
        log.debug("REST request to get EventOfPlateMill : {}", id);
        Optional<EventOfPlateMill> eventOfPlateMill = eventOfPlateMillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(eventOfPlateMill);
    }

    /**
     * {@code DELETE  /event-of-plate-mills/:id} : delete the "id" eventOfPlateMill.
     *
     * @param id the id of the eventOfPlateMill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/event-of-plate-mills/{id}")
    public ResponseEntity<Void> deleteEventOfPlateMill(@PathVariable Long id) {
        log.debug("REST request to delete EventOfPlateMill : {}", id);
        eventOfPlateMillService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/event-of-plate-mills?query=:query} : search for the eventOfPlateMill corresponding
     * to the query.
     *
     * @param query the query of the eventOfPlateMill search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/event-of-plate-mills")
    public ResponseEntity<List<EventOfPlateMill>> searchEventOfPlateMills(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of EventOfPlateMills for query {}", query);
        Page<EventOfPlateMill> page = eventOfPlateMillService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
