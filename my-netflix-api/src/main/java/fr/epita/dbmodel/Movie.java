package fr.epita.dbmodel;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GenericGenerator(name = "movie_id", strategy = "increment")
    private Integer movieId;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "movie_type")
    private String movieType;

    @Column(name = "description")
    private String description;

    @Column(name = "release_date")
    private Date releaseDate;

    public Movie(Integer movieId, String title, String author, String movieType, String description, Date releaseDate) {
        this.movieId = movieId;
        this.title = title;
        this.author = author;
        this.movieType = movieType;
        this.description = description;
        this.releaseDate = releaseDate;
    }

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
    	this.author = author;
    }

    public String getMovieType() {
        return movieType;
    }

    public void setMovieType(String movieType) {
        this.movieType = movieType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
    	this.description = description;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "movieId=" + movieId +
                ", Title='" + this.title + '\'' +
                ", Author='" + this.author + '\'' +
                ", movieType='" + movieType + '\'' +
                ", Description='" + this.description + '\'' +
                ", releaseDate=" + releaseDate +
                '}' + '\n';
    }
}