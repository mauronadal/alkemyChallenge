import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                {" "}
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/listado">
                  Listado
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">
                  Favoritos{" "}
                  {props.favorites.length > 0 && (
                    <>({props.favorites.length})</>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <Buscador />
        </div>
      </nav>
    </header>
  );
};

export default Header;
