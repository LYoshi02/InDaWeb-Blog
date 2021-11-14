import type { NextApiRequest, NextApiResponse } from "next";
import { gql, GraphQLClient } from "graphql-request";

type ResponseData = {
  id: string;
};

interface CreateCommentData {
  createComment: {
    id: string;
  };
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
    });

    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;

    try {
      const result = await graphQLClient.request<CreateCommentData>(
        query,
        req.body
      );
      return res.status(201).json({ id: result.createComment.id });
    } catch (error) {
      throw new Error("There was an error creating the comment");
    }
  }

  return res.status(422);
}
