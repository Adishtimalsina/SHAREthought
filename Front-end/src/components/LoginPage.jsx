import logo from "../store/logo.png";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../features/thoughts/authSlice.js";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(user))
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.token);
        toast.success(response?.message, {
          autoClose: 1500,
        });
        // if response is ok then direct user to the home page
        if (response.status === "success") {
          setTimeout(() => {
            navigate("/posts");
          }, 1500);
        }
      })
      .catch((error) => {
        toast.error(error?.response.message);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="login">
        <center className="loginContainer shadow-lg">
          <div className="loginLeft">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ margin: "60px" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",
                opacity: "0.6",
                margin: "10px",
              }}
            >
              Welcome to SHAREthoughts: Express yourself freely, but
              kindly—abusive language and threats are not tolerated.
            </p>
          </div>
          <div className="loginRight ">
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1 className="fw-normal">Login</h1>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={user.id}
                  placeholder="someone@email.com"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>

              <div className="form-floating mt-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={user.id}
                  placeholder="Verification Code"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>
                <br></br>
                <button className="btn btn-primary w-100 py-2" type="submit">
                  Login
                </button>
              </div>
              <br />
              <p>
                Don't have an account?{"  "}
                <Link to="/signup" className="text-decoration-none">
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};
export default LoginPage;
