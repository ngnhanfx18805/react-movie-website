import React, { useState, useEffect, useCallback } from "react";
import classes from "./MovieDetail.module.css";
const API_KEY = "2733f1312cb2d85d53a2321fd382e8be";

const MovieDetail = (props) => {
  const movie_id = props.movieId;
  const imgMovie = "https://image.tmdb.org/t/p/original" + props.movieImg;
  const URL =
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=` + API_KEY;
  const [videoMovies, setVideoMovies] = useState([]);
  var videoLink;

  const fetchMovieData = useCallback(async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // console.log(data.results);

      setVideoMovies(data.results); // Lấy dữ liệu video trả về sau khi gọi API
      return data.results;
    } catch (error) {
      console.log(error.message);
    }
  }, [URL]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  //Kiểm tra và lấy dữ liệu data phù hợp
  if (videoMovies.length !== 0) {
    videoMovies.forEach((e) => {
      if (
        e.site === "YouTube" &&
        (e.type === "Trailer" || e.type === "Teaser")
      ) {
        videoLink = "https://www.youtube.com/embed/" + e.key;
      }
      return;
    });
  }
  return (
    <React.Fragment>
      <div className={classes.movieDetail}>
        <div className={classes.detailContent}>
          <div className={classes.detailTitle}>
            <h2>{props.movieName}</h2>
          </div>
          <p>Release Date: {props.releaseDate}</p>
          <p>Vote: {props.vote}</p>
          <p>{props.details}</p>
        </div>
        <div className={classes.detailVideo}>
          {videoMovies.length === 0 ? (
            <img
              src={imgMovie}
              alt={props.movieName}
              className={classes.detailImage}
            />
          ) : (
            <iframe title={props.movieName} src={videoLink} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieDetail;
