import axios from "axios";

const API = axios.create({
  baseURL: "https://my-memories-api-ox4n.onrender.com/posts",
});

// add the token to the headers of every request
// under this axios instance
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  config.headers.Authorization = `Bearer ${user?.token}`;
  return config;
});

export const fetchPosts = (page) => API.get(`?page=${page}`);

export const fetchPost = (id) => API.get(`/${id}`);

export const fetchPostsBySearch = (search, tags) =>
  API.get(`/search?s=${search}&tags=${tags}`);

export const createPost = (formData) => API.post("/", formData);

export const updatePost = (id, formData) => API.patch(`/${id}`, formData);

export const likePost = (id) => API.patch(`/${id}/likepost`);

export const deletePost = (id) => API.delete(`/${id}/delete`);

export const commentPost = (comment, id) =>
  API.post(`/${id}/comment`, { comment });
