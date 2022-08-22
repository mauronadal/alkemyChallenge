import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  //Componente Favoritos
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    console.log(favsInLocal);
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);

      setFavorites(favsArray);
    }
  }, []);

  //Selector Favoritos

  const addOrRemoveFromFav = (e) => {
    const favMovies = localStorage.getItem("favs");
    let tempMovieInFavs;

    if (favMovies === null) {
      tempMovieInFavs = [];
      console.log("Tenemos Favoritos");
    } else {
      tempMovieInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("h5").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };

    let movieIsInArray = tempMovieInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMovieInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovieInFavs));
      setFavorites(tempMovieInFavs);

      console.log("Se agregó la pelicula");
    } else {
      let moviesLeft = tempMovieInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(tempMovieInFavs);
      console.log("Se eliminó la pelicula");
    }
  };

  // Rutas

  return (
    <Router>
      <div className="container mt-3">
        <Header favorites={favorites} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="listado"
            element={<Listado addOrRemoveFromFav={addOrRemoveFromFav} />}
          />
          <Route path="detalle" element={<Detalle />} />
          <Route path="contacto" element={<Listado />} />
          <Route path="resultados" element={<Resultados />} />
          <Route
            path="favoritos"
            element={
              <Favoritos
                favorites={favorites}
                addOrRemoveFromFav={addOrRemoveFromFav}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
