import React, { useEffect, useState } from 'react';
import './List.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const List = ({ title, fetchUrl }) => {
  const [mList, setMList] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: '390',
    width: '100%',
    playerVars: { autoplay: 1 },
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 8 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 }
  };

  const fetchMovie = async () => {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    setMList(data.Search || []);
  };

  useEffect(() => {
    fetchMovie();
  }, [fetchUrl]);

  
  const fetchTrailer = async (movieTitle) => {
    const apiKey = "AIzaSyBalbvfCzEpp6SQNtnwzVzpskUartH3vEM";
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle}+trailer&type=video&key=${apiKey}`
    );
    const data = await response.json();
    if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        return videoId;
    }
    return null;
};


const handleClick = async (movie) => {
    if (trailerUrl) {
        setTrailerUrl("");
    } else {
        const videoId = await fetchTrailer(movie.Title);
        if (videoId) {
            setTrailerUrl(videoId);
        } else {
            console.log("Trailer not found");
        }
    }
};


  return (
    <>
      <h4>{title}</h4>
      <Carousel responsive={responsive}>
        {mList.map((movie) => (
          <div key={movie.imdbID} className="movieContainer">
            <img
              src={movie.Poster}
              alt={movie.Title}
              onClick={() => handleClick(movie)}
              className="imagecard"
            />
          </div>
        ))}
      </Carousel>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </>
  );
};

export default List;
