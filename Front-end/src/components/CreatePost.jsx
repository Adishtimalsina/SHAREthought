import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import axios from "axios";
import { useState } from "react";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isClicked, setClick] = useState(false);
  const [emoji, setEmoji] = useState("");

  const post = async () => {
    //check if user is logged in or not to make a post
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login first to make a post");
    }

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/post`, emoji, {
        withCredentials: true,
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((response) => {
        //saving token in local storage
        console.log(response.data.status);
        toast.success(response?.data?.message, {
          autoClose: 2000,
        });
        //if response is ok then direct user to the home page
        if (response?.data.status === "success") {
          setTimeout(() => {
            try {
              navigate("/profile");
            } catch (error) {
              console.log(error.message);
            }
          }, 1500);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data.message);
      });
  };

  const showEmoji = (isClicked) => {
    setClick(!isClicked);
  };
  const writeEmoji = (e) => {
    setEmoji(emoji + e.native);
  };

  return (
    <form className="content shadow-lg">
      <ToastContainer />
      <h3 style={{ padding: "20px", textAlign: "center" }}>
        {" "}
        WHATS ON YOUR MIND TODAY?
      </h3>
      <div className="select-emoji">
        <BsFillEmojiSunglassesFill
          size={30}
          style={{ color: "yellow", margin: "10px" }}
          onClick={() => {
            showEmoji(isClicked);
          }}
        />
        <span style={{ color: "gray" }}>Click To Add Emoji</span>
      </div>
      <div className="thoughts">
        <textarea
          type="textarea"
          id="thoughtText"
          className="text-area"
          value={emoji}
          placeholder="Be respectful to everybody"
          onChange={(e) => setEmoji(e.target.value)}
        ></textarea>
        {isClicked && (
          <Picker
            className="emoji"
            data={data}
            onEmojiSelect={(e) => {
              writeEmoji(e);
            }}
          />
        )}
      </div>
      <center>
        <button
          type="button"
          className="post btn btn-outline-info"
          onClick={post}
        >
          Post
        </button>
      </center>
    </form>
  );
};

export default CreatePost;
