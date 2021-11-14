import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  PostDetail,
  Categories,
  PostWidget,
  AuthorDetails,
  Comments,
  CommentsForm,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";
import { PostDetails } from "../../types";

type Props = {
  post: PostDetails;
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const PostDetails = ({ post }: Props) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <AuthorDetails author={post.author} />
          {/* <CommentsForm slug={post.slug} /> */}
          {/* <Comments slug={post.slug} /> */}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories categories={post.categories} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params as IParams;
  const postDetails = await getPostDetails(slug);

  return {
    props: { post: postDetails },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const slugParams = posts.map((post) => ({
    params: { slug: post.node.slug },
  }));

  return {
    paths: slugParams,
    fallback: false,
  };
};
