import Image from "next/image";
import moment from "moment";

type Props = {
  authorName: string;
  authorPhotoUrl: string;
  creationDate: string;
};

const PostCreationDetails = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Image
          src={props.authorPhotoUrl}
          alt={props.authorName}
          layout="fixed"
          width="30"
          height="30"
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
        <p className="inline align-middle text-gray-700 ml-2 text-lg">
          {props.authorName}
        </p>
      </div>
      <div className="font-medium text-gray-700 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline mr-2 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{moment(props.creationDate).format("MMM DD, YYYY")}</span>
      </div>
    </>
  );
};

export default PostCreationDetails;
