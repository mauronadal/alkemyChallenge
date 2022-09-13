import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom"; // reemplaza a useHistory

function Login() {
  const navegate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      swAlert(<h2>Los compos no pueden estar vacios</h2>);

      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      swAlert(<h2>Debes escribir una dirección de correo válida</h2>);

      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      swAlert(<h2>Credenciales invalidad</h2>);

      return;
    }
    swAlert(<h2>Estamos listos para enviar la informacion</h2>);

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        console.log(res.data);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);

        navegate("/listado");
      });
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>

                    <form onSubmit={submitHandler}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          name="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX">
                          Email (challenge@alkemy.org)
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          name="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX">
                          Password (react)
                        </label>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
