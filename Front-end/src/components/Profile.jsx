import { useEffect } from "react";
import style from "./Post.module.css";
import { FcLike } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getUserThoughts } from "../features/thoughts/authSlice";
import { deletes, setPostID } from "../features/thoughts/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ deleteMenu }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.singleTweets);
  console.log(posts.status);

  useEffect(() => {
    dispatch(getUserThoughts());
  }, [dispatch]);

  const handleDelete = (values) => {
    dispatch(deletes());
    dispatch(setPostID(values));
  };

  //need to implement feature
  const handleEdit = () => {
    console.log("edit");
    return <h6>This feature is not available</h6>;
  };

  // //get postID
  // const getID = (values) => {
  //   console.log(values);
  // };

  if (posts.status === "fails") {
    return (
      <>
        <h1
          className="postList"
          style={{
            textAlign: "center",
            margin: "20% 0",
            color: "white",
          }}
        >
          you are not logged in, please login to see the posts
        </h1>
      </>
    );
  }

  if (Array.isArray(posts)) {
    return (
      <div className="postList">
        <ToastContainer />
        {posts.length === 0 ? (
          <h2
            className="postList"
            style={{
              textAlign: "center",
              margin: "20% 0",
              color: "white",
            }}
          >
            There is no post created, click on create post to create your first
            post.
          </h2>
        ) : (
          posts.map((thought) => (
            <div className={`${style.cards}  shadow-lg`} key={thought._id}>
              <ToastContainer />
              <div className="card">
                <div className="card-body">
                  <div className="card-top">
                    <h4 className="card-title">{thought.userName}</h4>

                    <div className="delete" onClick={deleteMenu}>
                      <MdDeleteForever
                        size={30}
                        style={{ color: "red" }}
                        onClick={() => handleDelete(thought._id)}
                      />
                    </div>
                  </div>
                  <p className="card-text" style={{ color: "gray" }}>
                    {new Date(thought.createdAt).toLocaleString()}
                  </p>
                  <p className="card-text">{thought.thoughtString}</p>

                  <hr></hr>
                  <div className="card-bottom">
                    <div>
                      <FcLike size={30} />
                      {"       "}
                      <span className={style.likeCount}>{thought.like}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      style={{ background: "purple" }}
                      onClick={handleEdit}
                    >
                      Edit Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
};

export default Profile;
