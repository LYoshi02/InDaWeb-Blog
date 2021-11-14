import { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";
import { PostCategory } from "../types";

type Props = {
  categories?: PostCategory[];
};

const Categories = (props: Props) => {
  const [categories, setCategories] = useState<PostCategory[]>(
    props.categories || []
  );

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-sl mb-8 font-semibold border-b pb-4">Categories</h3>
      <div>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            passHref
          >
            <a className="cursor-pointer border-b block pb-3 mb-3 last:border-b-0">
              {category.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
