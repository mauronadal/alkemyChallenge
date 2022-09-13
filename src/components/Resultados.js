import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swAlert from "@sweetalert/with-react";

function Resultados() {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [moviesResult, setMoviesResult] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=56e3ebccb526999e6cb7d4a9ff7eacae&language=es-ES&query=${keyword}`;

    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if (moviesArray.length === 0) {
          swAlert(<h5>No hay resultados</h5>);
        }

        setMoviesResult(moviesArray);
      })
      .catch((err) => console.log(err));
  }, [keyword]);

  return (
    <>
      <h2>
        Buscaste: <em>{keyword}</em>
      </h2>
      {moviesResult.length === 0 && <h3>No hay resultados</h3>}
      <div className="row">
        {moviesResult.map((oneMovie, index) => {
          return (
            <div className="col-4" key={index}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/detalle?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
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

export default Resultados;
