import React, { useEffect, useState } from 'react';
import './Banner.css';
import Netflix from "../login/Netflix.svg";
import YouTube from 'react-youtube-embed';
import movieTrailer from 'movie-trailer';

const Main = () => {
  const [BannerMovie, setBannerMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchBannerMovie = async () => {
    const url = 'http://www.omdbapi.com/?apikey=5abdd55c&s=animation&type=movie';
    const fetchBmovie = await fetch(url);
    const BannerResJson = await fetchBmovie.json();
    return BannerResJson;
  };

  useEffect(() => {
    const FetchingBannerData = async () => {
      const MovieData = await fetchBannerMovie();
      console.log('Movie Data:', MovieData);
      
     
      // if (MovieData.Search && MovieData.Search.length > 0) {
      //   const randomIndex = Math.floor(Math.random() * MovieData.Search.length);
      //   setBannerMovie(MovieData.Search[randomIndex]);
      //   console.log('Selected Movie:', MovieData.Search[randomIndex]);
      // }
     
      // if (MovieData.Poster) {
      //   MovieData.Poster =MovieData.Poster.replace("SX300", "SX800");
      // }

        
         if (MovieData.Search && MovieData.Search.length > 0) {
          const randomIndex = Math.floor(Math.random() * MovieData.Search.length);
          const selectedMovie = MovieData.Search[randomIndex];
          
       
          if (selectedMovie.Poster) {
            selectedMovie.Poster = selectedMovie.Poster.replace("SX300", "SX800");
          }
          setBannerMovie(selectedMovie);
          console.log('Selected Movie:', selectedMovie);
        }
    };

    FetchingBannerData();
  }, []);

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

  const handleclick =async(BannerMovie) => {
    if (trailerUrl) {
      setTrailerUrl("");
  } else {
      const videoId = await fetchTrailer(BannerMovie.Title);
      if (videoId) {
          setTrailerUrl(videoId);
      } else {
          console.log("Trailer not found");
      }
  }
  };

  const handleExitMovie = () => {
    if (trailerUrl) {
      setTrailerUrl('');
      document.querySelector('.Banner').style.display = 'block';
    }
  };

  return (
    <div>
      <img src={Netflix} className='Blogo' alt="Netflix Logo" />

      {/* {trailerUrl && <YouTube id={trailerUrl} />}

      {BannerMovie.Poster && (
        <img className='Banner' src={BannerMovie.Poster} alt={BannerMovie.Title}style={{height:'100vh'}} />
      )} */}
 <div className="Banner" style={{ height: '100vh' }}>
        {trailerUrl ? (
          <YouTube id={trailerUrl} className="trailer" />
        ) : (
          BannerMovie.Poster && (
            <img
              className="Banner"
              src={BannerMovie.Poster}
              alt={BannerMovie.Title}
              style={{ height: '100vh', width: '100%' }}
            />
          )
        )}
      </div>
      <div className="detail">
        <h1>{BannerMovie?.Title}</h1>
        <button className='btnp' onClick={() => handleclick(BannerMovie)}>Play</button>
        <button className='btnp' onClick={handleExitMovie}>Exit Trailer</button>
        <p className='movie-Desc'>{BannerMovie.Overview}</p>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
};

export default Main;
