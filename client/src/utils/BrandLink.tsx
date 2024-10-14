import React from "react";
import { Link } from "react-router-dom";

interface IBrandlink {
  className: string;
}

function BrandLink({ className }: IBrandlink) {
  return (
    <Link
      to="/"
      className={`self-center whitespace-nowrap dark:text-white ${className}`}
    >
      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
        Ali Jan's
      </span>
      Blogs
    </Link>
  );
}

export default BrandLink;
