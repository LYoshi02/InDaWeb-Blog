import { request, gql } from "graphql-request";
import { Post } from "../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

interface TData {
  postsConnection: {
    edges: {
      node: Post;
    }[];
  };
}

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
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

  const result = await request<TData>(graphqlAPI, query);

  return result.postsConnection.edges;
};
