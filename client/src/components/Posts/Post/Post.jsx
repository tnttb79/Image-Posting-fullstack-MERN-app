import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../features/postsSlice";
import Like from "./Like/Like";
import UnlikeIcon from "./Icons/UnlikeIcon";
import DeleteIcone from "./Icons/DeleteIcone";
import EditIcon from "./Icons/EditIcon";

const Post = ({ setUpdatingID, post }) => {
  const dispatch = useDispatch();

  const imgsrc = "http://localhost:3000/images/";
  const noImgAvailable =
    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className='group relative rounded-lg overflow-hidden duration-1000 bg-gray-200 hover:bg-gray-400 hover:shadow-3xl '>
      <div className='h-40'>
        {/* Cover image */}
        <img
          src={
            post.selectedFile ? `${imgsrc}${post.selectedFile}` : noImgAvailable
          }
          alt='image'
          className='h-44 w-full object-fit object-center '
        />
      </div>

      {/* Edit icon */}
      {post.creator === user?.existingUser?._id && (
        <button
          className='absolute top-2 right-2'
          onClick={() => setUpdatingID(post._id)}
        >
          <EditIcon />
        </button>
      )}

      <div className='h-1/2 p-4 '>
        {/* Tags */}
        <p className='text-xs font-thin italic truncate'>
          {post.tags
            .toString()
            .split(",")
            .map((tag) => `#${tag}`)}
        </p>

        {/* Title */}
        <h3 className='mb-2 text-2xl font-bold text-blue-800 truncate'>
          <a href='' className='hover:underline'>
            {post.title}
          </a>
        </h3>

        {/* Creator name */}
        <p className='text-sm italic font-semibold text-orange-500 capitalize truncate'>
          by {post.name}
        </p>

        {/* Descriptions */}
        <div className='flex flex-row justify-between text-sm mt-2 truncate'>
          <p>{post.descriptions}</p>
        </div>
        <div className='flex py-2 w-full'>

          {/* Like button */}
          {user ? (
            <button
              onClick={() => dispatch(likePost(post._id))}
              className='flex text-xs font-thin items-center'
            >
              <Like post={post} user={user} />
            </button>
          ) : (
            <>
              <UnlikeIcon />
              <p className='flex text-xs font-thin italic items-center'>
                &nbsp;{post.likes.length} Likes
              </p>
            </>
          )}

          {/* Delete button */}
          {post.creator === user?.existingUser?._id && (
            <button
              className='ml-auto'
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcone />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
