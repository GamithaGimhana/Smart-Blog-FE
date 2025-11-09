// import React from 'react'

// export default function Welcome() {
//   return (
//     <div>Welcome</div>
//   )
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
      <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to SmartBlog!
        </h1>
        <p className="text-gray-600 mb-8">
          Start your journey by logging in or creating a new account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-100 text-gray-800 py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
