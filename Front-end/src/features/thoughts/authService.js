import axios from "axios";
import { toast } from "react-toastify";

export const loginUser = async (userData) => {
  const response = axios
    .post(`${import.meta.env.VITE_BASE_URL}/login`, userData, {
      withCredentials: "true",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

//getting all users thoughts
export const getAllThoughts = async () => {
  const response = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/user`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response.data);
      return response.data.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

//getting single user data
export const getSingleUserData = async () => {
  const token = window.localStorage.getItem("token");

  // if (!token) {
  //   return toast.error("you are not logged in, please login to see the post");
  // }
  const response = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return response;
};

const deleteUserPost = async (id) => {
  const token = window.localStorage.getItem("token");
  const response = await axios
    .post(`${import.meta.env.VITE_BASE_URL}/delete`, id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return response;
};

//update user likes

const updateLikes = async (userID, id, likes) => {
  const token = window.localStorage.getItem("token");
  const response = await axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/likeUpdate`,
      { userID: userID, postId: id, likes: likes },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return response;
};

const authService = {
  loginUser,
  getAllThoughts,
  getSingleUserData,
  deleteUserPost,
  updateLikes,
};
export default authService; //exporting the service
