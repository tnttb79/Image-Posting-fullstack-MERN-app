import { useDispatch } from "react-redux";
import ReactTimeAgo from "react-time-ago";
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
    <div className='relative rounded-lg overflow-hidden duration-1000 bg-gray-200 hover:bg-gray-400 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:cursor-pointer'>
      {/* Cover image */}
      <img
        src={
          post.selectedFile ? `${imgsrc}${post.selectedFile}` : noImgAvailable
        }
        alt='image'
        className='h-44 w-full object-fit object-center'
      />

      {/* Edit icon */}
      {post.creator === user?.existingUser?._id && (
        <button
          className='absolute top-4 right-4'
          onClick={() => setUpdatingID(post._id)}
        >
          <EditIcon />
        </button>
      )}

      {/* Creator name */}
      <p className='text-xl font-semibold text-white capitalize absolute top-4 left-4 truncate'>
        {post.name}
      </p>

      {/* CreateAt with react-time-ago package */}
      <ReactTimeAgo
        className='text-xs font-thin text-white absolute top-11 left-4'
        date={new Date(post.createdAt)}
        locale='en-US'
      />

      <div className='px-4 pt-1 flex-row'>
        {/* Tags */}
        <p className='text-xs font-thin italic truncate'>
          {post.tags
            .toString()
            .split(",")
            .map((tag) => `#${tag.trim()}`)}
        </p>

        {/* Title */}
        <h3 className='mb-2 text-3xl font-bold text-blue-800 truncate'>
          <a href='' className='hover:underline'>
            {post.title}
          </a>
        </h3>

        {/* Descriptions */}
        <p className='text h-32 overflow-hidden'>{post.descriptions}</p>
        
        <div className='flex py-2'>
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
              <p className='flex text-xs font-thin items-center'>
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
