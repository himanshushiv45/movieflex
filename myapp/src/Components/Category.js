import { Link } from "react-router-dom";

function Category(props) {
  // console.log(props.movies);

  return (
    <>
      <div className="container trend-heading mt-5">
        <h2>{props.name}</h2>
      </div>

      <div className="container movie-card mb-5">
        {props.movies.map((movie, index) => {
          return (
            <div className="card single-movie" key={index}>
              <img src={movie.v_posterURL} />
              <div className="single-movie-info">
                <h4>{movie.name}</h4>

                <div className="bottom-info">
                  <Link to={`/player/${movie._id}`}>
                    <button>Watch Now</button>
                  </Link>

                  <p>{movie.imdbRating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Category;
