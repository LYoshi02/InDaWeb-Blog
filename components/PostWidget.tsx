import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { getRecentPosts, getSimilarPosts } from "../services";
import { RelatedPost } from "../types";

type Props =
  | {
      slug?: never;
      categories?: never;
    }
  | {
      slug: string;
      categories: string[];
    };

const PostWidget = ({ slug, categories }: Props) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);

  useEffect(() => {
    if (slug && categories) {
      getSimilarPosts(slug, categories).then((res) => {
        setRelatedPosts(res);
      });
    } else {
      getRecentPosts().then((res) => {
        setRelatedPosts(res);
      });
    }
  }, [slug, categories]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-sl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      <div>
        {relatedPosts.map((post) => (
          <div key={post.slug} className="flex items-center w-full mb-8">
            <div className="w-16 flex-none">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                layout="fixed"
                width="60"
                height="60"
                className="rounded-full align-middle"
                quality="100"
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
