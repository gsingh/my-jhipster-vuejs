package com.plate.mill.repository.search;

import com.plate.mill.domain.VideoOfEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link VideoOfEvent} entity.
 */
public interface VideoOfEventSearchRepository extends ElasticsearchRepository<VideoOfEvent, Long> {
}
