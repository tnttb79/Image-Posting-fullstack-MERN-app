import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const imgsrc = "https://my-memories-api-ox4n.onrender.com/images/";
const noImgAvailable =
  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

const RecommendedPosts = ({ post }) => {
  const navigate = useNavigate();
  // navigate to detailed page
  const handleDetailedPageClick = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <div
      className='relative rounded-lg overflow-hidden duration-1000 bg-gray-100 hover:cursor-pointer hover:bg-gray-300 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
      onClick={handleDetailedPageClick}
    >
      {/* Cover image */}
      <img
        src={
          post.selectedFile ? `${imgsrc}${post.selectedFile}` : noImgAvailable
        }
        alt='image'
        className='h-28 w-full object-fit object-center'
      />

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
        <h3 className='pb-2 text-3xl font-bold text-blue-800 truncate'>
          {post.title}
        </h3>

        {/* Descriptions */}
        <p className='text h-20 overflow-hidden'>{post.descriptions}</p>
      </div>
    </div>
  );
};

export default RecommendedPosts;
