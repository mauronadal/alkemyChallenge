import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Listado(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=56e3ebccb526999e6cb7d4a9ff7eacae&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios.get(endPoint).then((res) => {
      const apiData = res.data;
      setMoviesList(apiData.results);
    });
  }, [setMoviesList]);

  console.log(moviesList);

  return (
    <>
      <div className="row">
        {moviesList.map((oneMovie, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card my-4">
                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                <button className="favourite-btn" onClick={props.addOrRemoveFromFav} data-movie-id={oneMovie.id} >🖤</button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">
                    Detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Listado;
