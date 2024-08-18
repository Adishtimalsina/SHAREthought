import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

const initialState = {
  user: null,
  status: "idle",
  tweets: [],
  singleTweets: [],
  deleteMenu: false,
  postID: null,
  error: null,
};

//exporting this login to login componemt
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//getting all the users thoughts
export const getAllThoughts = createAsyncThunk(
  "auth/getAllThoughts",
  async (_, thunkAPI) => {
    try {
      return await authService.getAllThoughts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//
export const getUserThoughts = createAsyncThunk(
  "auth/getUserThoughts",
  async (_, thunkAPI) => {
    try {
      return await authService.getSingleUserData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//delete user posts
export const deletePost = createAsyncThunk(
  "auth/delete",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteUserPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//update user likes
export const updateLikes = createAsyncThunk(
  "auth/likes",
  async ({ userID, id, likes }, thunkAPI) => {
    try {
      return await authService.updateLikes(userID, id, likes);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "thought",
  initialState,
  reducers: {
    getAllUsers: (state = initialState, action) => {
      state.tweets = action.payload;
    },
    deletes: (state) => {
      state.deleteMenu = !state.deleteMenu;
    },
    setPostID: (state, action) => {
      state.postID = action.payload;
    },
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return { ...state, status: "pending" };
      })
      .addCase(login.fulfilled, (state, action) => {
        return { ...state, user: action.payload, status: "success" };
      })
      .addCase(login.rejected, (state, action) => {
        return { ...state, error: action.payload, status: "failed" };
      })
      .addCase(getAllThoughts.pending, (state) => {
        return { ...state, status: "pending" };
      })
      .addCase(getAllThoughts.fulfilled, (state, action) => {
        return { ...state, tweets: action.payload, status: "success" };
      })
      .addCase(getAllThoughts.rejected, (state) => {
        return { ...state, status: "failed" };
      })
      .addCase(getUserThoughts.pending, (state) => {
        return { ...state, status: "pending" };
      })
      .addCase(getUserThoughts.fulfilled, (state, action) => {
        return { ...state, singleTweets: action.payload, status: "success" };
      })
      .addCase(getUserThoughts.rejected, (state) => {
        return { ...state, status: "failed" };
      })
      .addCase(deletePost.pending, (state) => {
        return { ...state, status: "pending" };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload.deletedPost._id;
        const newTweets = state.singleTweets.filter(
          (tweet) => tweet._id !== id
        );
        return {
          ...state,
          status: "success",
          singleTweets: newTweets,
          deleteMenu: !state.deleteMenu,
        };
      })
      .addCase(deletePost.rejected, (state) => {
        return { ...state, status: "failed" };
      })
      .addCase(updateLikes.pending, (state) => {
        return { ...state, status: "pending" };
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        const { id, likes } = action.payload;

        const updatedTweets = state.tweets.map((tweet) => {
          if (tweet._id === id) {
            return { ...tweet, like: likes };
          } else {
            return tweet;
          }
        });

        return {
          ...state,
          tweets: updatedTweets,
          status: "success",
        };
      })
      .addCase(updateLikes.rejected, (state) => {
        return { ...state, status: "failed" };
      });
  },
});

export const { getAllUsers, deletes, setPostID, deleteUserPost, setLikes } =
  authSlice.actions;
export default authSlice.reducer; //export reducer to store.js
