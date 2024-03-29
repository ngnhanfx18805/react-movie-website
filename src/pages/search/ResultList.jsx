import React, { useEffect, useState } from "react";
import MovieDetail from "../browse/MovieDetail";
import styles from "./ResultList.module.css";

const IMG_PATH = `https://image.tmdb.org/t/p/original`;
const API_KEY = "2733f1312cb2d85d53a2321fd382e8be";

function ResultList(props) {
  const input = props.input || "";
  const URL =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&page=1&query=" +
    input;

  const [searchResults, setSearchResults] = useState([]); //Hiển thị kết quả trả về khi tìm kiếm
  const [movieData, setMovieData] = useState({}); // Thông tin phim khi người dùng click vào
  const [showDetail, setShowDetail] = useState(false); //Ẩn/hiện khi click vào phim
  const [clickMovieId, setClickMovieId] = useState(null); //So sánh id của phim cũ và phim mới mỗi khi click vào phim khác

  useEffect(() => {
    if (input) {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data.results);
        });
    }
  }, [input, URL]);
  return (
    <div className={styles.searchResults}>
      <h3 className={styles.resultTitle}>Search Result</h3>
      <div className={styles.resultsList}>
        {searchResults.length > 0 ? (
          searchResults.map(
            (item) =>
              item.poster_path && (
                <img
                  className={styles.imageSearch}
                  key={item.id}
                  src={IMG_PATH + item.poster_path}
                  alt={item.title}
                  onClick={() => {
                    setMovieData({
                      movieId: item.id,
                      movieName: item.title,
                      img: item.backdrop_path,
                      releaseDate: item.release_date || item.first_air_date,
                      vote: item.vote_average,
                      details:
                        item.overview || "This movie have no description.",
                    });

                    setShowDetail(!showDetail);

                    if (clickMovieId === item.id) {
                      setShowDetail(!showDetail);
                    } else {
                      setShowDetail(true);
                    }
                    setClickMovieId(item.id);
                  }}
                />
              )
          )
        ) : (
          <div className={styles.notify}>No Result</div>
        )}
      </div>

      {showDetail && (
        <MovieDetail
          movieId={movieData.movieId}
          movieName={movieData.movieName}
          movieImg={movieData.img}
          releaseDate={movieData.releaseDate}
          vote={movieData.vote}
          details={movieData.details}
        />
      )}
    </div>
  );
}

export default ResultList;
