import React from "react";
import Movie from "./Movie";

const MovieList = (props) => {
  const listApi = props.listMovie;

  return (
    <React.Fragment>
      <Movie
        key={Math.random()}
        movies={listApi.fetchNetflixOriginals}
        title="Original"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchTrending}
        title="Xu hướng"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchTopRated}
        title="Xếp hạng cao"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchComedyMovies}
        title="Hài kịch"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchDocumentaries}
        title="Phim tài liệu"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchHorrorMovies}
        title="Phim kinh dị"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchActionMovies}
        title="Phim hành động"
      />
      <Movie
        key={Math.random()}
        movies={listApi.fetchRomanceMovies}
        title="Phim lãng mạn"
      />
    </React.Fragment>
  );
};

export default MovieList;
