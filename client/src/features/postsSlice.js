import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../api/index";

// thunk to get all the posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const res = await API.fetchPosts(page);
  return res.data;
});

// thunk to get detailed post
export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const res = await API.fetchPost(id);
  return res.data
})

// thunk to get posts by search (also for recommended posts)
export const fetchPostsBySearch = createAsyncThunk(
  "post/fetchPostsBySearch",
  async ({search, tags}) => {
    const res = await API.fetchPostsBySearch(search, tags);
    return res.data;
  }
);

// // thunk to add new post (not yet implemented)
// export const addPost = createAsyncThunk('posts/addPost', async () => {
//   const res = await axios.post(url)
//   return res.data
// })

// export const updatePost = createAsyncThunk('posts/updatePost', async () => {

// })

// thunk to delete a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await API.deletePost(id);
  return id;
});

// thunk to like a post
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const res = await API.likePost(id);
  return res.data;
});

// thunk to comment a post
export const commentPost = createAsyncThunk("posts/commentPost", async ({comment, id}) => {
  const res = await API.commentPost(comment, id);
  return res.data
})

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  totalPage: null,
};

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
        state.error = action.payload.error;
      })
      // fetch detailed post
      .addCase(fetchPost.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post
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
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.post = action.payload.post
      })
  },
});

export default postsSlice.reducer;
