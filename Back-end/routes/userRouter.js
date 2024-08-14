const express = require("express");
const router = express.Router();
const {
  getUser,
  postThought,
  loginUser,
  logoutUser,
  postThoughts,
  getUserPost,
  deletePost,
  updateLike,
} = require("../controller/userController.js");

const {
  postAuthenticate,
  checkingPost,
  checkUserPost,
} = require("../middlewares/authenticate.js");

//post router
router.post("/likeUpdate", checkingPost, updateLike);
router.get("/posts", checkingPost, getUserPost);
router.post("/create", postThought);
router.get("/user", getUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/post", postAuthenticate, checkUserPost, postThoughts);
router.post("/delete", checkingPost, deletePost);

module.exports = router;
