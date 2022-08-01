package fr.epita.dbmodel;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "seen_movie")
public class SeenMovie {

    @Column(name = "movie_id")
    private Integer movieId;

    @Column(name = "contact_id")
    private Integer contactId;

    @Column(name = "watched_date")
    private Date watchedDate;

    public SeenMovie(Integer movieId, Integer contactId, Date watchedDate) {
        this.movieId = movieId;
        this.contactId = contactId;
        this.watchedDate = watchedDate;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public Integer getContactId() {
        return contactId;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public Date getWatchedDate() {
        return watchedDate;
    }

    public void setWatchedDate(Date watchedDate) {
        this.watchedDate = watchedDate;
    }

    @Override
    public String toString() {
        return "SeenMovie{" +
                "movieId=" + movieId +
                ", contactId=" + contactId +
                ", watchedDate=" + watchedDate +
                '}' + '\n';
    }
}
