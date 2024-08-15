import Post from "./Post";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostList = () => {
  return (
    <div className="postList">
      <ToastContainer />
      <Post />
    </div>
  );
};

export default PostList;
