import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { fetchPost, fetchPostsBySearch } from "../../features/postsSlice";
import RecommendedPosts from "./RecommendedPosts/RecommendedPosts";
import Comment from "./Comment/Comment";

const imgsrc = "http://localhost:3000/images/";
const noImgAvailable =
  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

const DetailedPage = () => {
  // get id of the current post from the URL
  const { id } = useParams();
  const dispatch = useDispatch();

  // get the current post from Redux store
  const { post, posts, loading } = useSelector((state) => state.posts);

  // dispatch fetchPost thunk action to fetch the current post
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id, dispatch]);

  // dispatch fetchPostsBySearch thunk action to fetch the reccommended post
  useEffect(() => {
    if (post) {
      dispatch(
        fetchPostsBySearch({ search: post.title, tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  // get the current post out of the reccommended posts
  const recommendedPosts = posts
    .slice(0, 5)
    .filter((item) => item._id !== post?._id);

  return (
    <>
      {loading && (
        <div className='col-span-3 flex justify-center'>
          <img
            className='w-20 h-20 mt-80 animate-spin'
            src='https://www.svgrepo.com/show/448500/loading.svg'
            alt='Loading icon'
          />
        </div>
      )}

      {!loading && post && (
        <div className='col-span-3 h-5/6 rounded-lg overflow-hidden duration-1000 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
          <div className='flex h-3/5'>
            <div className='w-3/5 m-6'>
              {/* Title */}
              <h3 className='pb-5 text-5xl font-semibold text-blue-800 truncate'>
                {post.title}
              </h3>

              {/* Creator name */}
              <p className='font-semibold capitalize truncate'>
                Posted by: {post.name}
              </p>

              {/* Create At */}
              <ReactTimeAgo
                className='text-xs font-thin text-gray-500'
                date={new Date(post.createdAt)}
                locale='en-US'
              />

              {/* Descriptions */}
              <p className='h-20 my-3 border-t-2'>{post.descriptions}</p>

              {/* Tags */}
              <p className='text font-thin italic border-b-2 text-gray-500 truncate'>
                {post.tags
                  .toString()
                  .split(",")
                  .map((tag) => `#${tag.trim()}`)}
              </p>

              {/* Comment section */}
              <Comment post={post} />
            </div>

            {/* Cover image */}
            <img
              className='h-full w-2/5 mt-4 mr-4 object-fit object-center rounded-3xl'
              src={`${imgsrc}${post.selectedFile}` || noImgAvailable}
              alt='image'
            />
          </div>

          {/* Reccommend posts */}
          <div className='mx-6 mt-2 h-2/5'>
            <p className='font-semibold pb-2 border-b-2'>Simmiliar posts:</p>
            <div className='grid grid-cols-4 gap-6 mt-2'>
              {!!recommendedPosts.length &&
                recommendedPosts.map((post) => (
                  <RecommendedPosts post={post} key={post._id} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedPage;
