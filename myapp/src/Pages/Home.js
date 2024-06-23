import Category from "../Components/Category.js";
import "./Home.css";
import Footer from "../Components/Footer.js";
import { useEffect, useRef, useState } from "react";
import Navigation from "../Components/Navigation.js";
import { Link } from "react-router-dom";

function Home() {
  //   useEffect(() => {
  //     getallMovies();
  //   }, []);

  //   const getallMovies = async () => {
  //     try {
  //       let movieResponse = await fetch("http://localhost:8000/movies/");
  //       let movieData = await movieResponse;
  //       console.log(movieData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  let [allMovies, setAllMovies] = useState([]);
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [dramaMovies, setDramaMovies] = useState([]);
  let [scifiMovies, setScifiMovies] = useState([]);
  let [comedyMovies, setComedyMovies] = useState([]);
  let [horrorMovies, setHorrorMovies] = useState([]);
  let genresName = useRef("");
  let [searchMovies, setSearchMovies] = useState([]);
  let [searchMoviesStatus, setSearchMoviesStatus] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/movies/")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.status === true) {
          // set all movies
          setAllMovies(res.movies);

          // Trending Movies
          let sortMovies = JSON.parse(JSON.stringify(res.movies));
          sortMovies.sort((a, b) => {
            return b.watchers - a.watchers;
          });

          let trendingMovies = sortMovies.slice(0, 5);
          //   console.log(trendMovies);
          let genres = trendingMovies[0].genres.split(",");

          let new_genres = "";

          genres.forEach((ele, index) => {
            new_genres += `${ele} | `;
          });
          genresName.current = new_genres;
          setTrendingMovies(trendingMovies);

          // Drama Movies
          let dramaMovies = res.movies.filter((ele, index) => {
            return ele.genres.toLowerCase().includes("drama");
          });
          // console.log(dramaMovies);
          setDramaMovies(dramaMovies.slice(0, 5));

          // Sci-fi Movies
          let scifiMovies = res.movies.filter((ele, index) => {
            return ele.genres.toLowerCase().includes("sci-fi");
          });
          // console.log(scifiMovies)
          setScifiMovies(scifiMovies.slice(0, 5));

          // Comedy Movies
          let comedyMovies = res.movies.filter((ele, index) => {
            return ele.genres.toLowerCase().includes("comedy");
          });
          setComedyMovies(comedyMovies.slice(0, 5));

          // Horror Movies
          let horrorMovies = res.movies.filter((ele, index) => {
            return ele.genres.toLowerCase().includes("horror");
          });
          setHorrorMovies(horrorMovies.slice(0, 5));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ---------------------------------------------------------------

  // Function for search movie
  let searchMovie = (movieName) => {
    // console.log(movieName);
    if (movieName !== "") {
      setSearchMoviesStatus(false);
      let getAllMovies = allMovies.filter((ele, index) => {
        return ele.name.toLowerCase().includes(movieName.toLowerCase());
      });
      setSearchMovies(getAllMovies);
      setSearchMoviesStatus(false);
    } else {
      setSearchMoviesStatus(true);
    }
  };

  // console.log(trendingMovies[0])

  return (
    <>
      <Navigation />

      {/* Search Container */}
      <div className="search-bar">
        <label>Search</label>
        <input
          type="search"
          className="search-inp"
          placeholder="Search movie"
          onChange={(e) => {
            searchMovie(e.target.value);
          }}
        />
      </div>

      {/* Banner Container */}

      {searchMoviesStatus ? (
        <>
          <div className="container-fluid top-container">
            <div className="container main-container">
              <img src={trendingMovies[0]?.h_posterURL} />
              <div className="img-container">
                <div className="movie-details">
                  <h2>{trendingMovies[0]?.name}</h2>
                  <p>
                    <span>{trendingMovies[0]?.releaseDate.slice(0, 4)}</span>
                    <sup>.</sup>
                    <span>2hr 33m</span>
                    <sup>.</sup>
                    <span>3 Languages</span>
                  </p>
                  <div className="movie-description">
                    <p>{trendingMovies[0]?.description}</p>
                  </div>
                  <p className="genres">{genresName.current.slice(0, -2)}</p>
                  {/* console.log(genresName.current); */}

                  <Link to={`/player/${trendingMovies[0]?._id}`}>
                    <button className="watchNow-btn">
                      <i className="fa-solid fa-play"></i> Watch Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* movies category components */}
          <div className="container-fluid trend-movies">
            <Category name="Trending Movies" movies={trendingMovies} />
            <Category name="Drama Movies" movies={dramaMovies} />
            <Category name="Horror Movies" movies={horrorMovies} />
            <Category name="Comedy Movies" movies={comedyMovies} />
            <Category name="Sci-fi Movies" movies={scifiMovies} />
          </div>

          {/* footer */}
          <div className="container-fluid footer-container">
            <Footer />
          </div>
        </>
      ) : (
        <>
          {/* movies category components */}
          <div className="container-fluid trend-movies">
            <Category name="All Movies" movies={searchMovies} />
          </div>

          {/* footer */}
          <div className="container-fluid footer-container">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
export default Home;
