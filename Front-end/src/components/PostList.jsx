import Post from "./Post";
import { useDispatch } from "react-redux";

const PostList = () => {
  return (
    <div className="postList">
      <Post />
    </div>
  );
};

export default PostList;
