import React, { useState, useEffect, useCallback } from "react";

import NavBar from "./NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList ";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function Browse(props) {
  const [movie, setMovie] = useState({});

  const fetchNetflixOriginalsHandler = useCallback(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3${props.requests.fetchNetflixOriginals}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    // console.log(randomMovie);

    setMovie(randomMovie);
  }, []);

  useEffect(() => {
    fetchNetflixOriginalsHandler();
  }, [fetchNetflixOriginalsHandler]);

  const image = IMAGE_URL + movie.poster_path;

  const mystyle = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100%`,
  };
  const listMovie = props.requests;
  // console.log(`Brow ${listMovie}`);
  return (
    <div>
      <div style={mystyle}>
        <NavBar />
        <Banner movie={movie} />
        {/* <img src={image1} /> */}
      </div>
      <MovieList listMovie={listMovie} />
    </div>
  );
}

export default Browse;
