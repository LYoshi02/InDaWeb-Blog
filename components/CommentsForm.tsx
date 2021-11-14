import { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

import { SentComment } from "../types";

type Props = {
  slug: string;
};

const LOCAL_STORAGE_NAME_KEY = "name";
const LOCAL_STORAGE_EMAIL_KEY = "email";

const CommentsForm = (props: Props) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const commentInput = useRef<HTMLTextAreaElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const storeDataInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedName = window.localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
    const savedEmail = window.localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);

    if (savedName && savedEmail) {
      nameInput.current!.value = savedName;
      emailInput.current!.value = savedEmail;
    }
  }, []);

  const handleCommentSubmition = async () => {
    setError(false);

    const comment = commentInput.current!.value;
    const name = nameInput.current!.value;
    const email = emailInput.current!.value;
    const isStoreDataChecked = storeDataInput.current!.checked;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    if (isStoreDataChecked) {
      window.localStorage.setItem(LOCAL_STORAGE_NAME_KEY, name);
      window.localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_NAME_KEY);
      window.localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
    }

    const commentObj: SentComment = {
      comment,
      name,
      email,
      slug: props.slug,
    };

    try {
      await submitComment(commentObj);
      showMessage(setShowSuccessMessage, 3000);
      clearInputs();
    } catch (e) {
      setShowErrorMessage(true);
      showMessage(setShowErrorMessage, 3000);
    }
  };

  const showMessage = (setShowMessage: (v: boolean) => void, time?: number) => {
    setShowMessage(true);
    if (time) {
      setTimeout(() => {
        setShowMessage(false);
      }, time);
    }
  };

  const clearInputs = () => {
    commentInput.current!.value = "";
    nameInput.current!.value = "";
    emailInput.current!.value = "";
    storeDataInput.current!.checked = false;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
          ref={commentInput}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
          ref={nameInput}
        />
        <input
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
          ref={emailInput}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            id="storeData"
            name="storeData"
            ref={storeDataInput}
          />
          <label
            htmlFor="storeData"
            className="text-gray-500 cursor-pointer ml-2"
          >
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required!</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmition}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block text-white bg-pink-600 text-lg rounded-full px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
        {showErrorMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-red-500">
            There was an error. Try again later.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
