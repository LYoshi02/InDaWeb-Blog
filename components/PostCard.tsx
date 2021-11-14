import Link from "next/link";
import Image from "next/image";

import PostCreationDetails from "./PostCreationDetails";
import { Post } from "../types";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="responsive"
          width={post.featuredImage.width}
          height={post.featuredImage.height}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h2 className="transition duration-700 text-center mb-6 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="mb-6 grid grid-rows-2 gap-4 lg:flex lg:justify-center">
        <PostCreationDetails
          authorName={post.author.name}
          authorPhotoUrl={post.author.photo.url}
          creationDate={post.createdAt}
        />
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`} passHref>
          <a className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
