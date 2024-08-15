const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//update likes of the posts
const updateLike = async (req, res) => {
  try {
    const { postId, likes } = req.body;
    const user = req.user;

    const post = await userModel.updateOne(
      { _id: req.user, "thoughtString._id": postId },
      { $set: { "thoughtString.$.like": likes } },
      {
        $project: {
          id: "$thoughtString._id",
          likes: "$thoughtString.thoughtText.like",
        },
      }
    );
    return res.status(200).json({
      message: "liked",
      likes: likes,
      id: postId,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get individual posts
const getUserPost = async (req, res) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.user);
    const posts = await userModel.aggregate([
      { $match: { _id: userID } },
      { $unwind: "$thoughtString" },
      {
        $project: {
          userName: 1,
          like: "$thoughtString.like",
          _id: "$thoughtString._id",
          thoughtString: "$thoughtString.thoughtText",
          createdAt: "$thoughtString.createdAt",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//get the user data
const getUser = async (req, res) => {
  try {
    const user = await userModel.aggregate([
      {
        $unwind: "$thoughtString",
      },
      {
        $project: {
          userName: "$userName",
          like: "$thoughtString.like",
          _id: "$thoughtString._id",
          thoughtText: "$thoughtString.thoughtText",
          createdAt: "$thoughtString.createdAt",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      status: "success",
      length: user.length,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const postThought = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userModel.create(userData);
    return res.status(201).json({
      status: "success",
      message: "user created successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User doesn't exist, please signup first",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: "fail",
        message: "Email or Password is Incorrect",
      });
    }
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRE_IN,
    });
    //set user password undefined
    user.password = undefined;
    {
      return res
        .status(200)
        .cookie("token", token, {
          expiresIn: process.env.EXPIRE_IN,
          httpOnly: true,
          secure: true,
          SameSite: "None",
        })
        .json({
          status: "success",
          message: "User logged in successfully",
          token,
          user,
        });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//user logOut
const logoutUser = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        status: "fail",
        message: "You are not logged in",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      SameSite: "None",
    });
    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const postThoughts = async (req, res) => {
  try {
    const thought = req.body;
    if (!thought) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a your thought",
      });
    }
    const newthought = {
      thoughtText: thought,
    };

    const user = await userModel.findById(req.user);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      user.thoughtString.push(newthought);
      await user.save();
      return res.status(201).json({
        status: "success",
        message: "Thought created successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//delete post
const deletePost = async (req, res) => {
  try {
    const postID = req.body;
    //finding user
    const findUser = await userModel.findOne({ _id: req.user });
    //finding post
    const findPost = findUser.thoughtString.id(postID);

    const user = await userModel.updateOne(
      { _id: req.user },
      {
        $pull: { thoughtString: { _id: postID } },
      }
    );
    // const post = await user.findOne({ _id: postID });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Post not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
      deletedPost: findPost,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getUser,
  postThought,
  loginUser,
  logoutUser,
  postThoughts,
  getUserPost,
  deletePost,
  updateLike,
};
