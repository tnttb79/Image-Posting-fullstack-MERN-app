import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setUpdatingID }) => {
  // get the posts state from the store
  const { posts, loading, error } = useSelector((state) => state.posts);

  return (
    <>
      {loading && (
        <div className='flex gap-4 flex-wrap justify-center items-center'>
          <img
            className='w-20 h-20 mt-80 animate-spin'
            src='https://www.svgrepo.com/show/448500/loading.svg'
            alt='Loading icon'
          />
        </div>
      )}

      {!posts.length && !loading && (
        <p className='italic text-3xl'>... No post available yet</p>
      )}

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
