import { IoMdHome } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = ({ selectedTab, setTab }) => {
  const Name = useSelector((state) => state.singleTweets);
  const navigate = useNavigate();
  const [profileName, setUserName] = useState("");

  //get username
  useEffect(() => {
    if (Array.isArray(Name)) {
      Name.map((item) => {
        setUserName(item.userName);
      });
    }
  });

  const logOut = async (req, res) => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");

        if (response.data.status === "success") {
          setTimeout(() => {
            navigate("/posts");
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3  nav-bar">
      <ToastContainer />
      <div className="d-flex align-items-center me-md-auto text-white text-decoration-none">
        <span className="fs-3 p-4">Main Menu</span>
      </div>
      <hr style={{ color: "white" }} />
      <ul className="nav nav-pills flex-column mb-auto menu-items">
        <li
          className="nav-item"
          onClick={() => {
            setTab("Home");
          }}
        >
          <Link
            to="/posts"
            className={`nav-link p-3 text-white ${
              selectedTab === "Home" && "active"
            }`}
            aria-current="page"
          >
            <IoMdHome size={30} /> Home
          </Link>
        </li>
        <li
          onClick={() => {
            setTab("Create post");
          }}
        >
          <Link
            to="/create-post"
            className={`nav-link p-3 text-white ${
              selectedTab === "Create post" && "active"
            }`}
          >
            <CiCirclePlus size={30} />
            {"    "}Create Post
          </Link>
        </li>
        <li
          onClick={() => {
            setTab("Profile");
          }}
        >
          <Link
            to="/profile"
            className={`nav-link p-3 text-white ${
              selectedTab === "Profile" && "active"
            }`}
          >
            <CgProfile size={30} /> {"  "}Profile
          </Link>
        </li>
        <button
          type="button"
          className="btn btn-outline-danger mt-4 btn-lg"
          onClick={logOut}
        >
          LOGOUT
        </button>
      </ul>
      <hr />
      <div className="drop">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{profileName}</strong>
        </a>
      </div>
    </div>
  );
};
export default Sidebar;
