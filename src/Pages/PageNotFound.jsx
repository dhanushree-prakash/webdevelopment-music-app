import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[587px] bg-[#121212] text-[#E0E0E0]">
      <h1 className="text-9xl font-bold text-[#FF007F]">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-400 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#FF007F] text-white rounded-lg text-lg font-semibold hover:bg-[#BB86FC] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
