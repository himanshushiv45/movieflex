import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Components/Navigation";

function Player() {
  let params = useParams();
  let [singleMovie, setSingleMovie] = useState({});
  let [userInfo, setUserInfo] = useState({});
  let genresName = useRef("");
  let [showPlayer, setShowPlayer] = useState(false);
  let videoPlayer = useRef(); //DOM Manupulation
  let [userMovieModel, setUserMovieModel] = useState({});
  useEffect(() => {
    // console.log(localStorage.getItem("token"))
    let user = JSON.parse(localStorage.getItem("token"));
    setUserInfo(user);
    fetch(`http://localhost:8000/movies/${params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status === true) {
          let genres = res.movie.genres.split(",");

          let new_genres = "";
          genres.forEach((ele, index) => {
            new_genres += `${ele} | `;
          });
          genresName.current = new_genres;
          setSingleMovie(res.movie);
          console.log(res.movie);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (showPlayer === true) {
      videoPlayer.current.currentTime = userMovieModel.watchtime;
    }
  }, [showPlayer]);

  // play function
  function play() {
    fetch("http://localhost:8000/user/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ movie: params.id, user: userInfo.user_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // console.log(res);
        setUserMovieModel(res.userMovie);
        if (res.status === true) {
          setShowPlayer(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // close player function
  function closeplayer() {
    fetch(`http://localhost:8000/user/closePlayer/${userMovieModel._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({ watchtime: videoPlayer.current.currentTime }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowPlayer(false);
  }

  return (
    <>
      {!showPlayer ? (
        <>
          <Navigation />
          <div className="container-fluid top-container">
            <div className="container main-container">
              <img src={singleMovie?.h_posterURL} />
              <div className="img-container">
                <div className="movie-details">
                  <h2>{singleMovie?.name}</h2>
                  <p>
                    <span>{singleMovie?.releaseDate?.slice(0, 4)}</span>
                    <sup>.</sup>
                    <span>2hr 33m</span>
                    <sup>.</sup>
                    <span>3 Languages</span>
                  </p>
                  <div className="movie-description">
                    <p>{singleMovie?.description}</p>
                  </div>
                  <p className="genres">{genresName.current.slice(0, -2)}</p>

                  <button className="watchNow-btn" onClick={play}>
                    <i className="fa-solid fa-play"></i> Play Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid player_container_fluid">
            <div className="container player_container">
              <div className="player_movie_info">
                <h2>{singleMovie?.name}</h2>
                <i className="fa-solid fa-close" onClick={closeplayer}></i>
              </div>
              <div className="video_container">
                <video controls autoPlay ref={videoPlayer}>
                  <source
                    src={`http://localhost:8000/movies/stream/${singleMovie?._id}`}
                  />
                </video>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Player;
