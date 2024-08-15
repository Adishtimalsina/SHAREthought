import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import SignUp from "./components/SignUp.jsx";
import Profile from "./components/Profile.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Contact from "./components/Contact.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/posts" /> },
      { path: "/posts", element: <PostList /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/contact", element: <Contact /> },
      { path: "/profile", element: <Profile /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
