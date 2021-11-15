import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { ArrowProps } from "react-multi-carousel/lib/types";

import { getFeaturedPosts } from "../services";
import { FeaturedPost } from "../types";

import "react-multi-carousel/lib/styles.css";
import FeaturedPostCard from "./FeaturedPostCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <div
      className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 text-white w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        ></path>
      </svg>
    </div>
  );
};

const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <div
      className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
    </div>
  );
};

const FeaturedPosts = () => {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);

  useEffect(() => {
    getFeaturedPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite
      swipeable
      draggable
      containerClass="mb-8"
      itemClass="px-4"
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {posts.map((post) => (
        <FeaturedPostCard key={post.slug} post={post} />
      ))}
    </Carousel>
  );
};

export default FeaturedPosts;
