import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { getAllPosts } from "../services/post"
import { preview } from "vite"

export default function Post() {

    const [post, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const fetchData = async (pageNumber = 1) => {
        try {
            const data = await getAllPosts(pageNumber, 2)
            setPosts(data?.data)
            setTotalPage(data?.totalPages)
            setPage(pageNumber)

            console.log(data)
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    useEffect(() => {//initially load posts and send request to server
        fetchData()
    }, [])

    return (
        // <div>
        //     <h2>All Posts</h2>
        //     <div>
        //         {post.map((p:any, index) => (
        //             <div key={index}>
        //                 <h2>{p?.title}</h2>
        //                 <p>{p?.content}</p>
        //                 <img src={p?.imageURL} alt={p?.title} width='100px' />
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                All Posts
            </h2>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.map((p: any, index) => (
                <div 
                    key={p._id ?? index} 
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden" >
                    
                    <img src={p?.imageURL} alt={p?.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2"> {p?.title} </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{p?.content}</p>
                    </div>
                </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-3">
                <button
                    onClick={() => fetchData(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        page === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 transition"
                    }`}
                    >
                    Prev
                </button>

                <span className="px-4 py-2 text-gray-700"> Page {page} of {totalPage} </span>

                <button
                    onClick={() => fetchData(page + 1)}
                    disabled={page === totalPage}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        page === totalPage
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 transition"
                    }`}
                    >
                    Next
                </button>
            </div>
        </div>
    )
}