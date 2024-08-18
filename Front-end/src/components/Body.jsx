import { useState } from "react";
import DeletePost from "./DeletePost";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Body = ({ toogleNav, children }) => {
  const [selectedTab, setTab] = useState("Home");
  const deleteBox = useSelector((state) => state.deleteMenu);

  return (
    <div className="body">
      {toogleNav && <Sidebar selectedTab={selectedTab} setTab={setTab} />}
      {children}
      {/* {selectedTab === "Create post" && (
        <div className="content">
          <CreatePost />
        </div>
      )}
      {selectedTab === "Home" && (
        <div className="postList">
          <PostList />
        </div>
      )}
      {selectedTab === "Profile" && (
        <div className="postList">
          <Profile
            deleteProfilePosts={deleteProfilePosts}
            deletePosts={deletePosts}
            getPostID={getPostID}
          />
        </div>
      )}*/}
      {deleteBox && <DeletePost />}
    </div>
  );
};

export default Body;
