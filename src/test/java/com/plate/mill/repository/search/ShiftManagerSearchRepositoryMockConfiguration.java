package com.plate.mill.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ShiftManagerSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ShiftManagerSearchRepositoryMockConfiguration {

    @MockBean
    private ShiftManagerSearchRepository mockShiftManagerSearchRepository;

}
