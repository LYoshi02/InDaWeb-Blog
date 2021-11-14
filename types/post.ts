import { RichTextContent } from "@graphcms/rich-text-types";

export interface Post {
  author: {
    bio: string;
    name: string;
    id: string;
    photo: {
      url: string;
    };
  };
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
    width: string;
    height: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];
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
