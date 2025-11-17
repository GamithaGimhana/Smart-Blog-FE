import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    if (setUser) setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Admin Controls</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Manage Users</h3>
            <p className="text-sm text-gray-500">View and manage all registered users.</p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">Open →</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Moderate Posts</h3>
            <p className="text-sm text-gray-500">Review and moderate user content.</p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">Open →</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Site Settings</h3>
            <p className="text-sm text-gray-500">Configure global site settings and features.</p>
            <button className="mt-4 text-blue-600 hover:underline text-sm">Open →</button>
          </div>
        </div>
      </main>

      <footer className="text-center text-gray-500 text-sm py-4 border-t">
        © {new Date().getFullYear()} Smart Blog — Admin
      </footer>
    </div>
  );
}
