import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight text-gray-800 hover:text-gray-900">
          SmartBlog
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/home" className="hover:text-black transition-colors">
            Home
          </Link>

          <Link to="/post" className="hover:text-black transition-colors">
            Posts
          </Link>

          {/* () && () */}
          {(user.roles?.includes('ADMIN') || user.roles?.includes('AUTHOR')) && (
            <Link to="/my-post" className="hover:text-black transition-colors">
                My Posts
            </Link>
          )}
          {/* {(user.roles?.includes('ADMIN') || user.roles?.includes('AUTHOR')) ? (
                <Link to="/my-post" className="hover:text-black transition-colors">
                    My Posts
                </Link>
            ): null} */}

          {/* Logout Button */}
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95">
            Logout
          </button>
        </nav>

      </div>
    </header>
  );
}
