import { Post } from "../types";

type Props = {
  post: Post;
};

const PostCard = (props: Props) => {
  return (
    <div>
      {props.post.title}
      {props.post.excerpt}
    </div>
  );
};

export default PostCard;
