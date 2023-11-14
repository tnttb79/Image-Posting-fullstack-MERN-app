import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { commentPost } from "../../../features/postsSlice";

const Comment = ({ post }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  // state to handle the comment input
  const [comment, setComment] = useState("");

  // get the current user from localStorage, then put it together with the comment
  // in a string, then send the comment string and post id to backend with commentPost thunk action
  const handleComment = () => {
    dispatch(
      commentPost({
        comment: `${user?.existingUser?.name}: ${comment}`,
        id: post._id,
      })
    );
  };

  // useRef to help scroll to the newest comment
  const commentsRef = useRef();
  useEffect(() => {
    commentsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest",
    inline: "start" });
  }, [post]);

  return (
    <div className='flex justify-between h-52 mt-3'>
      {/* Comment lists */}
      <div className={`${user ? 'w-1/2' : 'w-full'} overflow-y-scroll`}>
        {/* get the comment from the redux store post state. 
        This way UI will be updated automatically */}
        {post?.comments.length ? post.comments.map((comment, index) => (
          <div key={index} className="pb-2">
            <span className='capitalize font-semibold'>
              {/* get user name */}
              {comment?.split(": ")[0]}:{" "}
            </span>
            {/* get comment content */}
            {comment?.split(": ")[1]}
          </div>
        )) : <p className='italic text-gray-400'>... No comment yet</p>}
        {/* scroll to latest comment w/ useRef */}
        <div ref={commentsRef}/>
      </div>

      {/* Comment box */}
      {user && (<div className='w-1/2 bg-white rounded-lg border p-2'>
        <div className='px-3 mb-2 mt-2 h-2/3'>
          <textarea
            placeholder='Leave a comment...'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className='w-full h-full placeholder:italic bg-gray-100 rounded border border-gray-400 resize-none py-2 px-3 focus:outline-none focus:bg-white'
          ></textarea>
        </div>
        <div className='flex justify-end px-4'>
          <button
            className='px-4 py-1.5 rounded-md text-white text-sm bg-pink-500 disabled:bg-gray-400'
            // disabled when there is no content in comment box
            disabled={!comment}
            onClick={handleComment}
          >
            Add
          </button>
        </div>
      </div>)}
    </div>
  );
};

export default Comment;
