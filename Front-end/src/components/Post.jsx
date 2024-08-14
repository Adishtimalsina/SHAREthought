import { useEffect } from "react";
import style from "./Post.module.css";
import { FcLike } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { getAllThoughts, updateLikes } from "../features/thoughts/authSlice.js";
import { toast } from "react-toastify";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.tweets);

  console.log(posts);
  console.log("error in post page");

  useEffect(() => {
    dispatch(getAllThoughts());
  }, [dispatch]);

  const handleLike = (Value, initialLikes) => {
    // dispatch(setPostID(Value));
    // dispatch(setPostID(Value));
    dispatch(updateLikes({ id: Value, likes: initialLikes + 1 }))
      .unwrap()
      .then((response) => {
        console.log(response.message);
        if (response.message === "liked") {
          toast.success("You liked the post!");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };
  // const { postList } = useContext(Data);
  return posts.map((thought) => (
    <div className={`${style.cards}  shadow-lg`} key={thought._id}>
      <div className="card">
        <div className="card-body">
          <div className="cardss" style={{ display: "flex" }}>
            <h4 className="card-title">{thought.userName}</h4>
            <button
              type="button"
              className="btn btn-primary"
              style={{ margin: "0 15px" }}
            >
              Follow
            </button>
          </div>
          <p className="card-text" style={{ color: "gray" }}>
            {new Date(thought.createdAt).toLocaleString()}
          </p>
          <p className="card-text">{thought.thoughtText}</p>
          <hr></hr>
          <FcLike
            size={30}
            className="likeButton"
            onClick={() => handleLike(thought._id, thought.like)}
          />
          {"       "}
          <span className={style.likeCount}>{thought.like}</span>
        </div>
      </div>
    </div>
  ));
};
export default Post;
