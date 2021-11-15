import { RichTextContent } from "@graphcms/rich-text-types";
import { Author } from "./";

export interface Post {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
    width: string;
    height: string;
  };
  categories: PostCategory[];
}

export interface PostDetails extends Post {
  content: {
    raw: RichTextContent;
  };
}

export type RelatedPost = {
  title: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
};

export type PostCategory = {
  name: string;
  slug: string;
};

export type FeaturedPost = {
  title: string;
  slug: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
  author: {
    name: string;
    photo: {
      url: string;
    };
  };
};
