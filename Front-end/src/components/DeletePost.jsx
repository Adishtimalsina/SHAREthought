import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletes, deletePost } from "../features/thoughts/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DeletePost = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.postID);

  const handleDelete = () => {
    dispatch(deletes());
  };

  //handle deletePost
  const handleDeletePost = () => {
    dispatch(deletePost(id))
      .then((response) => {
        toast.success(response.payload.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="deletePost">
      <ToastContainer />
      <div className="deletes">
        <p>Do you want to Delete this post?</p>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-danger r"
            onClick={handleDeletePost}
          >
            YES
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleDelete}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeletePost;
