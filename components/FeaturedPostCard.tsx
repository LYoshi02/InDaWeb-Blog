import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { FeaturedPost } from "../types";

type Props = {
  post: FeaturedPost;
};

const FeaturedPostCard = ({ post }: Props) => {
  return (
    <div key={post.slug} className="relative h-72">
      <div className="absolute top-0 left-0 w-full h-full rounded-lg z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 rounded-lg"></div>

      <Link href={`/post/${post.slug}`} passHref>
        <a>
          <div className="h-full w-full flex flex-col justify-between items-center p-4 absolute top-0 left-0 z-20 cursor-pointer">
            <div className="flex-grow flex flex-col justify-center items-center text-center mb-2">
              <p className="text-white font-semibold text-sm mb-2 text-shadow">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <h2 className="text-2xl text-white font-semibold text-shadow">
                {post.title}
              </h2>
            </div>
            <div className="flex items-center">
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                layout="fixed"
                width="35"
                height="35"
                className="rounded-full"
                unoptimized
              />
              <p className="text-white text-shadow ml-2">{post.author.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default FeaturedPostCard;
