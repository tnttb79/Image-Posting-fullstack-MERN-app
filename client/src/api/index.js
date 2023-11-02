import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:3000/posts",
});

// add the token to the headers ofevery request 
// under this axios instance
API.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('profile'))
    config.headers.Authorization = `Bearer ${user?.token}`
    return config
  }
)

export const fetchPosts = (page) => API.get(`?page=${page}`)

export const createPost = (formData) => API.post('/', formData)

export const updatePost = (id, formData) => API.patch(`/${id}`, formData)

export const likePost = id => API.patch(`/${id}/likepost`)

export const deletePost = id => API.delete(`/${id}`)