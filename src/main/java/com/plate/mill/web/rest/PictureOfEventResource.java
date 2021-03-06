package com.plate.mill.web.rest;

import com.plate.mill.domain.PictureOfEvent;
import com.plate.mill.service.PictureOfEventService;
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
 * REST controller for managing {@link com.plate.mill.domain.PictureOfEvent}.
 */
@RestController
@RequestMapping("/api")
public class PictureOfEventResource {

    private final Logger log = LoggerFactory.getLogger(PictureOfEventResource.class);

    private static final String ENTITY_NAME = "pictureOfEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PictureOfEventService pictureOfEventService;

    public PictureOfEventResource(PictureOfEventService pictureOfEventService) {
        this.pictureOfEventService = pictureOfEventService;
    }

    /**
     * {@code POST  /picture-of-events} : Create a new pictureOfEvent.
     *
     * @param pictureOfEvent the pictureOfEvent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pictureOfEvent, or with status {@code 400 (Bad Request)} if the pictureOfEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/picture-of-events")
    public ResponseEntity<PictureOfEvent> createPictureOfEvent(@Valid @RequestBody PictureOfEvent pictureOfEvent) throws URISyntaxException {
        log.debug("REST request to save PictureOfEvent : {}", pictureOfEvent);
        if (pictureOfEvent.getId() != null) {
            throw new BadRequestAlertException("A new pictureOfEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PictureOfEvent result = pictureOfEventService.save(pictureOfEvent);
        return ResponseEntity.created(new URI("/api/picture-of-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /picture-of-events} : Updates an existing pictureOfEvent.
     *
     * @param pictureOfEvent the pictureOfEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pictureOfEvent,
     * or with status {@code 400 (Bad Request)} if the pictureOfEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pictureOfEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/picture-of-events")
    public ResponseEntity<PictureOfEvent> updatePictureOfEvent(@Valid @RequestBody PictureOfEvent pictureOfEvent) throws URISyntaxException {
        log.debug("REST request to update PictureOfEvent : {}", pictureOfEvent);
        if (pictureOfEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PictureOfEvent result = pictureOfEventService.save(pictureOfEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pictureOfEvent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /picture-of-events} : get all the pictureOfEvents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pictureOfEvents in body.
     */
    @GetMapping("/picture-of-events")
    public ResponseEntity<List<PictureOfEvent>> getAllPictureOfEvents(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of PictureOfEvents");
        Page<PictureOfEvent> page = pictureOfEventService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /picture-of-events/:id} : get the "id" pictureOfEvent.
     *
     * @param id the id of the pictureOfEvent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pictureOfEvent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/picture-of-events/{id}")
    public ResponseEntity<PictureOfEvent> getPictureOfEvent(@PathVariable Long id) {
        log.debug("REST request to get PictureOfEvent : {}", id);
        Optional<PictureOfEvent> pictureOfEvent = pictureOfEventService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pictureOfEvent);
    }

    /**
     * {@code DELETE  /picture-of-events/:id} : delete the "id" pictureOfEvent.
     *
     * @param id the id of the pictureOfEvent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/picture-of-events/{id}")
    public ResponseEntity<Void> deletePictureOfEvent(@PathVariable Long id) {
        log.debug("REST request to delete PictureOfEvent : {}", id);
        pictureOfEventService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/picture-of-events?query=:query} : search for the pictureOfEvent corresponding
     * to the query.
     *
     * @param query the query of the pictureOfEvent search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/picture-of-events")
    public ResponseEntity<List<PictureOfEvent>> searchPictureOfEvents(@RequestParam String query, Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to search for a page of PictureOfEvents for query {}", query);
        Page<PictureOfEvent> page = pictureOfEventService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
