import moment from "moment";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

import { getComments } from "../services";
import { FetchedComment } from "../types";

type Props = {
  slug: string;
};

const Comments = (props: Props) => {
  const [comments, setComments] = useState<FetchedComment[]>([]);

  useEffect(() => {
    getComments(props.slug).then((res) => {
      setComments(res);
    });
  }, [props.slug]);

  if (comments.length === 0) return null;

  const sortedComments = comments.sort((firstCom, secondCom) =>
    firstCom.createdAt < secondCom.createdAt ? 1 : -1
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {comments.length} Comments
      </h3>
      {sortedComments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-100 mb-4 pb-4">
          <p className="mb-4">
            <span className="font-semibold">{comment.name}</span> on{" "}
            {moment(comment.createdAt).format("MMM DD, YYYY")}
          </p>
          <p className="whitespace-pre-line text-gray-600 w-full">
            {parse(comment.comment)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
