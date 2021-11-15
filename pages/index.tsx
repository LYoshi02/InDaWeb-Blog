import type { GetStaticProps, NextPage } from "next";

import {
  Categories,
  Head,
  PostCard,
  FeaturedPosts,
  PostWidget,
} from "../components";
import { getPosts } from "../services";
import { Post } from "../types";

type Props = {
  posts: { node: Post }[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className="container mx-auto px-4 mb-8 md:px-10">
      <Head />
      <FeaturedPosts />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {props.posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
    revalidate: 60,
  };
};
