import LikeIcon from "../Icons/LikeIcon";
import UnlikeIcon from "../Icons/UnlikeIcon";

const Like = ({post, user}) => {
  if (post.likes.length > 0) {
    return post.likes.includes(user?.existingUser?._id) ? (
      <>
        <LikeIcon />
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <UnlikeIcon />
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  } else {
    return (
      <>
        <UnlikeIcon />
        &nbsp;Like
      </>
    );
  }
};

export default Like