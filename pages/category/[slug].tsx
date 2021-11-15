import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { Categories, Head, PostCard, PostWidget } from "../../components";
import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
} from "../../services";
import { Post, PostCategory } from "../../types";
import { useRouter } from "next/dist/client/router";

type Props = {
  posts: Post[];
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Category = (props: Props) => {
  const [categoryName, setCategoryName] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCategoryBySlug(router.query.slug as string).then((res) => {
      setCategoryName(res.name);
    });
  });

  return (
    <div className="container mx-auto px-4 mb-8 md:px-10">
      <Head title={categoryName} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {props.posts.map((post) => (
            <PostCard key={post.slug} post={post} />
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

export default Category;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params as IParams;
  const posts = await getPostsByCategory(slug);

  return {
    props: { posts },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: PostCategory[] = await getCategories();
  const slugParams = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths: slugParams,
    fallback: "blocking",
  };
};
