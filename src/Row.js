import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtbe from "react-youtube";
import movieTrailer from "movie-trailer";

const base_img = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  // Set State
  const [movies, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // Run when row loads, or when any vairable in the bracket changes
  //   Any Variables used in the use effect that are scoped oyutside of the function it must be included within the brackets
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData([fetchUrl]);
  }, []);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer()
      //   .then((url) => {
      //     // Need to parse the url to get the id
      //     const urlParam = new URLSearchParams(new URL(url).search());
      //     setTrailerUrl(urlParam.get("v"));
      //   })
      //   .catch((err) => console.log(err));
      console.log(movie?.name || movie?.title || "");
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParam.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(trailerUrl);
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* Postetrs */}
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_img}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtbe videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
