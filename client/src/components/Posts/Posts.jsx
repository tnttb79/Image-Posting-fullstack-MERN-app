import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Post from "./Post/Post";

const Posts = ({ setUpdatingID }) => {
  // get the posts state from the store
  const { posts, loading, error } = useSelector((state) => state.posts);

  const [searchParams] = useSearchParams();

  return (
    <>
      {loading && (
        <div className='flex justify-center items-center flex-col'>
          <p className='text-xl text-center font-bold'>
            😔😔😔I use a free hosting service, please allow some time for the
            application to boot up from a cold start. <br/> Thank you!!!
          </p>
          <img
            className='w-20 h-20 mt-80 animate-spin'
            src='https://www.svgrepo.com/show/448500/loading.svg'
            alt='Loading icon'
          />
        </div>
      )}
      {/* display no post available */}
      {!posts.length && !loading && !searchParams.get("s") && (
        <p className='italic text-3xl'>... No post available yet</p>
      )}

      {/* display no post found by checking search query string */}
      {!posts.length && !loading && searchParams.get("s") && (
        <p className='italic text-3xl'>... No post found</p>
      )}

      {!loading && !error && posts && (
        <div className='grid grid-cols-4 gap-4'>
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
