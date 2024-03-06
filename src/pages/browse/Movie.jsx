import React, { useEffect, useCallback, useState } from "react";
import classes from "./Movie.module.css";
import MovieDetail from "./MovieDetail";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const Movie = (props) => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [clickMovieId, setClickMovieId] = useState(null);
  const fetchHandler = useCallback(async (linkMovie) => {
    const respone = await fetch(`https://api.themoviedb.org/3${linkMovie}`);
    const data = await respone.json();
    // const transformedMovie = data.results.map((movieData) => {
    //   return {
    //     id: movieData.id,
    //     backdrop_path: movieData.backdrop_path,
    //     poster_path: movieData.poster_path,
    //   };
    // });
    setMovies(data.results);
  }, []);

  useEffect(() => {
    fetchHandler(props.movies);
  }, [fetchHandler]);

  const a = movies.map((movie) => {
    const image =
      props.title === "Original"
        ? IMAGE_URL + movie.poster_path
        : IMAGE_URL + movie.backdrop_path;

    const imageClickHandler = () => {
      // console.log("Clicked");
      //Lưu thông tin phim
      setMovieData({
        movie_id: movie.id,
        movie_name: movie.title || movie.name,
        img: movie.backdrop_path || movie.poster_path,
        releaseDate: movie.release_date || movie.first_air_date,
        vote: movie.vote_average,
        details: movie.overview || "No description available!",
      });
      //Xét điều kiện khi click vào phim (ẩn/hiện thông tin phim)
      if (clickMovieId === movie.id) {
        setShowDetail(!showDetail);
      } else {
        setShowDetail(true);
      }
      setClickMovieId(movie.id);
    };

    return (
      <img
        key={Math.random()}
        src={image}
        style={{ height: "100px" }}
        className={classes.detailImage}
        onClick={imageClickHandler}
      />
    );
  });

  return (
    <div>
      <div className={classes.movie}>
        <div className={classes.scroll}>
          <div className={classes.detailTitle}>
            {props.title !== "Original" ? <h2>{props.title}</h2> : <></>}
          </div>
        </div>
        <div className={classes.detailVideo}>{a}</div>
      </div>
      {showDetail && (
        <MovieDetail
          movieId={movieData.movie_id}
          movieName={movieData.movie_name}
          movieImg={movieData.img}
          releaseDate={movieData.releaseDate}
          vote={movieData.vote}
          details={movieData.details}
        />
      )}
    </div>
  );
};

export default Movie;
