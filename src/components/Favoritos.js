import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Favoritos(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="row">
        {props.favorites.map((oneMovie, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card my-4">
                <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                <button
                  className="favourite-btn"
                  onClick={props.addOrRemoveFromFav}
                  data-movie-id={oneMovie.id}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  {/*<Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">
                      Detalle
            </Link>*/}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Favoritos;
