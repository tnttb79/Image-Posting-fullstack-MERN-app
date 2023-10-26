import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../features/post/postsSlice";
import Post from "./Post/Post";

const Posts = ({ setUpdatingID }) => {
  // get the posts state from the store
  const { posts, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  
  // since create and update post just use Axios and no Redux
  // I need to use useEffect here to fetch all the post
  // when the form refresh the page (I didn't use e.preventDefault())
  // This useEffect can be delete if create and update use redux since Post subscribe to the store
  // fetch all posts from MongoDB when the component is mounted
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="">
      {loading && <h1>Loading...</h1>}
      {!posts.length && <p className="italic text-3xl">... No post available yet</p>}

      {!loading && !error && posts && (
        <div className='grid grid-cols-2 gap-4 w-full'>
          {posts.map((post) => (
            <Post setUpdatingID={setUpdatingID} post={post} key={post._id} />
          ))}
        </div>
      )}

      {!loading && error && <h1>Error: {error}</h1>}
    </div>
  );
};

export default Posts;
