import axios from "axios";

export const loginUser = async (userData) => {
  const response = axios
    .post(`${import.meta.env.VITE_BASE_URL}/login`, userData, {
      withCredentials: true,
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
  const response = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/posts`, {
      withCredentials: true,
      headers: {
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
  const response = await axios
    .post(`${import.meta.env.VITE_BASE_URL}/delete`, id, {
      withCredentials: true,
      headers: {
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

const updateLikes = async (id, likes) => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/likeUpdate`,
      { postId: id, likes: likes },
      {
        withCredentials: true,
        headers: {
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
