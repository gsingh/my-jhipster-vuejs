package com.plate.mill.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A VideoOfEvent.
 */
@Entity
@Table(name = "video_of_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "videoofevent")
public class VideoOfEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "video_date")
    private LocalDate videoDate;

    
    @Lob
    @Column(name = "video_file", nullable = false)
    private byte[] videoFile;

    @Column(name = "video_file_content_type", nullable = false)
    private String videoFileContentType;

    @ManyToOne
    @JsonIgnoreProperties("videoOfEvents")
    private EventOfPlateMill eventPM;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getVideoDate() {
        return videoDate;
    }

    public VideoOfEvent videoDate(LocalDate videoDate) {
        this.videoDate = videoDate;
        return this;
    }

    public void setVideoDate(LocalDate videoDate) {
        this.videoDate = videoDate;
    }

    public byte[] getVideoFile() {
        return videoFile;
    }

    public VideoOfEvent videoFile(byte[] videoFile) {
        this.videoFile = videoFile;
        return this;
    }

    public void setVideoFile(byte[] videoFile) {
        this.videoFile = videoFile;
    }

    public String getVideoFileContentType() {
        return videoFileContentType;
    }

    public VideoOfEvent videoFileContentType(String videoFileContentType) {
        this.videoFileContentType = videoFileContentType;
        return this;
    }

    public void setVideoFileContentType(String videoFileContentType) {
        this.videoFileContentType = videoFileContentType;
    }

    public EventOfPlateMill getEventPM() {
        return eventPM;
    }

    public VideoOfEvent eventPM(EventOfPlateMill eventOfPlateMill) {
        this.eventPM = eventOfPlateMill;
        return this;
    }

    public void setEventPM(EventOfPlateMill eventOfPlateMill) {
        this.eventPM = eventOfPlateMill;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VideoOfEvent)) {
            return false;
        }
        return id != null && id.equals(((VideoOfEvent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "VideoOfEvent{" +
            "id=" + getId() +
            ", videoDate='" + getVideoDate() + "'" +
            ", videoFile='" + getVideoFile() + "'" +
            ", videoFileContentType='" + getVideoFileContentType() + "'" +
            "}";
    }
}
