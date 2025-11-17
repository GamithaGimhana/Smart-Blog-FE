import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/40">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Welcome to SmartBlog!
        </h1>

        <p className="text-gray-600 mb-10">
          Explore posts, manage content, or jump into the admin dashboard.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 w-full">

          <Link to="/home" className="w-full py-3 rounded-xl bg-black text-white font-medium tracking-wide shadow-lg hover:bg-gray-900 transition-all active:scale-[0.97]">
            Home
          </Link>

          <Link to="/post" className="w-full py-3 rounded-xl bg-gray-800 text-white font-medium tracking-wide shadow-lg hover:bg-gray-900 transition-all active:scale-[0.97]">
            Posts
          </Link>

          <Link to="/home/admin" className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium tracking-wide shadow-lg hover:bg-indigo-700 transition-all active:scale-[0.97]">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
