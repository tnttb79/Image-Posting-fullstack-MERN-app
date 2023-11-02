import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setUpdatingID }) => {
  // get the posts state from the store
  const { posts, loading, error } = useSelector((state) => state.posts);


  return (
    <>
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
    </>
  );
};

export default Posts;
