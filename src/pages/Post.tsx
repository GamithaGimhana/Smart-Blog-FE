import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { createPost, getAllPosts } from "../services/post"

export default function Post() {

    const [post, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState("")

    const fetchData = async (pageNumber = 1) => {
        try {
            const data = await getAllPosts(pageNumber, 3)
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        setImage(file)
        setPreview(URL.createObjectURL(file))
        }
    }

    const handleSavePost = async (e: FormEvent) => {
        e.preventDefault()
        try {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("tags", tags)
        if (image) formData.append("image", image)

        const res = await createPost(formData)

        await fetchData(1)
        } catch (err) {
        console.error(err)
        }
    }

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

        // <div className="min-h-screen bg-gray-50 py-10 px-4">

        //     <form>
        //         <input
        //         type="text"
        //         placeholder="title"
        //         value={title}
        //         onChange={(e) => setTitle(e.target.value)}
        //         />
        //         <input
        //         type="text"
        //         placeholder="content"
        //         value={content}
        //         onChange={(e) => setContent(e.target.value)}
        //         />
        //         <input
        //         type="text"
        //         placeholder="tags"
        //         value={tags}
        //         onChange={(e) => setTags(e.target.value)}
        //         />
        //         <input type="file" accept="image/*" onChange={handleImageChange} />
        //         {preview && (
        //         <div>
        //             <img src={preview} />
        //         </div>
        //         )}
        //         <button onClick={handleSavePost}>Save</button>
        //     </form>

        //     <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        //         All Posts
        //     </h2>

        //     {/* Posts Grid */}
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //         {post.map((p: any, index) => (
        //         <div 
        //             key={p._id ?? index} 
        //             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden" >
                    
        //             <img src={p?.imageURL} alt={p?.title} className="w-full h-48 object-cover" />
        //             <div className="p-4">
        //                 <h3 className="text-lg font-semibold text-gray-900 mb-2"> {p?.title} </h3>
        //                 <p className="text-gray-600 text-sm line-clamp-3">{p?.content}</p>
        //             </div>
        //         </div>
        //         ))}
        //     </div>

        //     {/* Pagination */}
        //     <div className="flex justify-center mt-8 space-x-3">
        //         <button
        //             onClick={() => fetchData(page - 1)}
        //             disabled={page === 1}
        //             className={`px-4 py-2 rounded-lg font-medium ${
        //                 page === 1
        //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        //                 : "bg-blue-500 text-white hover:bg-blue-600 transition"
        //             }`}
        //             >
        //             Prev
        //         </button>

        //         <span className="px-4 py-2 text-gray-700"> Page {page} of {totalPage} </span>

        //         <button
        //             onClick={() => fetchData(page + 1)}
        //             disabled={page === totalPage}
        //             className={`px-4 py-2 rounded-lg font-medium ${
        //                 page === totalPage
        //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        //                 : "bg-blue-500 text-white hover:bg-blue-600 transition"
        //             }`}
        //             >
        //             Next
        //         </button>
        //     </div>
        // </div>

        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Create Post Card */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                    Create New Post
                </h2>

                <form onSubmit={handleSavePost} className="space-y-5">
                    {/* Title */}
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Enter a catchy title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    </div>

                    {/* Content */}
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Content</label>
                    <textarea
                        placeholder="Write your thoughts here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    </div>

                    {/* Tags */}
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Tags</label>
                    <input
                        type="text"
                        placeholder="e.g. tech, ai, news"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>

                    {/* Image Upload */}
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                                file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {preview && (
                        <div className="mt-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-48 h-32 object-cover rounded-lg border"
                        />
                        </div>
                    )}
                    </div>

                    {/* Submit Button */}
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all"
                    >
                    Publish Post
                    </button>
                </form>
                </div>

                {/* All Posts Section */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                All Posts
                </h2>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {post.map((p: any, index) => (
                    <div
                    key={p._id ?? index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                    <img
                        src={p?.imageURL || "https://via.placeholder.com/300x200"}
                        alt={p?.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {p?.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                        {p?.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                        {p?.tags?.map((tag: string, i: number) => (
                            <span
                            key={i}
                            className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                            >
                            #{tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10 space-x-3">
                <button
                    onClick={() => fetchData(page - 1)}
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
                    onClick={() => fetchData(page + 1)}
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
            </div>
        </div>

    )
}