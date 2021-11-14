import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";

import { PostDetails } from "../types";
import PostCreationDetails from "./PostCreationDetails";

type Props = {
  post: PostDetails;
};

const PostDetail = ({ post }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="responsive"
          height={post.featuredImage.height}
          width={post.featuredImage.width}
          className="object-top h-full w-full rounded-t-lg"
          priority={true}
        />
      </div>

      <div className="px-4 lg:px-0">
        <div className="flex justify-between mb-6 w-full lg:justify-start lg:gap-4">
          <PostCreationDetails
            authorName={post.author.name}
            authorPhotoUrl={post.author.photo.url}
            creationDate={post.createdAt}
          />
        </div>

        <h2 className="mb-8 text-3xl font-semibold">{post.title}</h2>
        <div className="prose">
          <RichText content={post.content.raw} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
