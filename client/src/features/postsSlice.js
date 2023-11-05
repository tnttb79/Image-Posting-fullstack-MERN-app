import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../api/index";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  totalPage: null,
};

// thunk to get all the posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const res = await API.fetchPosts(page);
  return res.data;
});

// thunk to get posts by search
export const fetchPostsBySearch = createAsyncThunk(
  "post/fetchPostsBySearch",
  async (title) => {
    const res = await API.fetchPostsBySearch(title);
    return res.data;
  }
);

// thunk to add new post (not yet implemented)
// export const addPost = createAsyncThunk('posts/addPost', async () => {
//   const res = await axios.post(url)
//   return res.data
// })

// thunk to delete a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await API.deletePost(id);
  return id;
});

// thunk to like a post
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const { data } = await API.likePost(id);
  return data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      // fetch all posts reducer logic
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch posts by search reducer logic
      .addCase(fetchPostsBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      // delete post reducer logic
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      // like post reducer logic
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

export default postsSlice.reducer;
