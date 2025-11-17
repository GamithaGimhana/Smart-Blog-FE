import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/post";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const data = await getAllPosts(pageNumber, 6); // fetch 6 for featured
      setPosts(data?.data || []);
      setTotalPage(data?.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-400 to-gray-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to SmartBlog
          </h1>
          <p className="text-lg mb-8">
            Discover, share, and manage your favorite posts all in one place.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/post"
              className="px-6 py-3 rounded-xl bg-white text-gray-600 font-semibold shadow-lg hover:bg-gray-100 transition-all"
            >
              Create Posts
            </Link>
            <Link
              to="/home/admin"
              className="px-6 py-3 rounded-xl border border-white font-semibold hover:bg-white hover:text-gray-600 transition-all"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={p?.imageURL || "https://via.placeholder.com/300x200"}
                  alt={p?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{p?.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{p?.content}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p?.tags?.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/post/${p._id}`}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Optional Pagination */}
        <div className="flex justify-center mt-10 space-x-3">
          <button
            onClick={() => fetchPosts(page - 1)}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg font-medium ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 transition"
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {totalPage}
          </span>
          <button
            onClick={() => fetchPosts(page + 1)}
            disabled={page === totalPage}
            className={`px-5 py-2 rounded-lg font-medium ${
              page === totalPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 transition"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
