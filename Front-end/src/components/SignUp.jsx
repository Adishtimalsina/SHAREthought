import logo from "../store/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleForm = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
    // setUser(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/create`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoclose: 2000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error?.response?.data?.message, {
          autoclose: 2000,
        });
      });
  };
  return (
    <>
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
                padding: "5px",
              }}
            >
              Welcome to SHAREthoughts: Express yourself freely, but
              kindly—abusive language and threats are not tolerated.
            </p>
          </div>
          <div className="loginRight">
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1 className="fw-normal">Sign Up</h1>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="User Name"
                  value={user.id}
                  required
                  onChange={handleForm}
                />
                <label htmlFor="floatingInput">User Name</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Phone Number"
                  value={user.id}
                  required
                  onChange={handleForm}
                />
                <label htmlFor="email">Email</label>
              </div>
              <br></br>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  required
                  value={user.id}
                  onChange={handleForm}
                />
                <label htmlFor="floatingInput">Password</label>
              </div>
              <br />
              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign up
              </button>
              <br />
              <p>
                Already have an Account?{"  "}
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};
export default SignUp;
