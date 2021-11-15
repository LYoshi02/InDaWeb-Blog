import { request, gql } from "graphql-request";
import {
  SentComment,
  Post,
  PostCategory,
  PostDetails,
  RelatedPost,
  FetchedComment,
  FeaturedPost,
} from "../types";

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

export const getSimilarPosts = async (slug: string, categories: string[]) => {
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

  const result = await request<RelatedPostsData>(graphqlAPI, query, {
    slug,
    categories,
  });

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

interface PostDetailsData {
  post: PostDetails;
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `;

  const result = await request<PostDetailsData>(graphqlAPI, query, { slug });

  return result.post;
};

export const submitComment = async (comment: SentComment) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await result.json();
};

interface CommentsData {
  comments: FetchedComment[];
}

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        comment
        name
        id
        createdAt
      }
    }
  `;

  const result = await request<CommentsData>(graphqlAPI, query, { slug });

  return result.comments;
};

interface FeaturedPostsData {
  posts: FeaturedPost[];
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {
      posts(where: { featuredPost: true }) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
        author {
          name
          photo {
            url
          }
        }
      }
    }
  `;

  const result = await request<FeaturedPostsData>(graphqlAPI, query);

  return result.posts;
};

interface PostsByCategoryData {
  posts: Post[];
}

export const getPostsByCategory = async (category: string) => {
  const query = gql`
    query GetPostsByCategory($category: String!) {
      posts(where: { categories_some: { slug: $category } }) {
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
  `;

  const result = await request<PostsByCategoryData>(graphqlAPI, query, {
    category,
  });

  return result.posts;
};
