// import { useAuth } from '../contexts/authContext';

// export default function Home() {

//   const { user } = useAuth();

//   return (
//     <div>
//         <h1>
//             {user?.email}
//         </h1>
//     </div>
//   )
// }

import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth(); // make sure logout exists in context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage / cached data if any
    localStorage.clear();
    sessionStorage.clear();

    // Call auth context logout if available
    if (logout) logout();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome back
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold mb-2">Your Profile</h3>
            <p className="text-gray-500 text-sm">
              View or update your personal information.
            </p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">
              Manage Profile →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold mb-2">Your Posts</h3>
            <p className="text-gray-500 text-sm">
              Check your published or draft articles.
            </p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">
              View Posts →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-gray-700 font-semibold mb-2">Settings</h3>
            <p className="text-gray-500 text-sm">
              Customize your preferences or notifications.
            </p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">
              Open Settings →
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-4 border-t">
        © {new Date().getFullYear()} Smart Blog. All rights reserved.
      </footer>
    </div>
  );
}
