import { request, gql } from "graphql-request";
import { Post, PostCategory, RelatedPost } from "../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

interface AllPostsData {
  postsConnection: {
    edges: {
      node: Post;
    }[];
  };
}

export const getPosts = async () => {
  const query = gql`
    query GetAllPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
              width
              height
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request<AllPostsData>(graphqlAPI, query);

  return result.postsConnection.edges;
};

interface RelatedPostsData {
  posts: RelatedPost[];
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_DESC, first: 3) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request<RelatedPostsData>(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request<RelatedPostsData>(graphqlAPI, query);

  return result.posts;
};

interface CategoriesData {
  categories: PostCategory[];
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        slug
        name
      }
    }
  `;

  const result = await request<CategoriesData>(graphqlAPI, query);

  return result.categories;
};
