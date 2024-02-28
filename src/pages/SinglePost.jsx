import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import LayoutMain from '../components/LayoutMain'

function SinglePost() {

    const { id } = useParams()
    const [post, setPost] = useState([])
    const [mediaItems, setMediaItems] = useState([])

    // comments
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    //pagination
    const [prevPost, setPrevPost] = useState(null)
    const [nextPost, setNextPost] = useState(null)
    const navigate = useNavigate()

    //loading
    const [isLoading, setIsLoading] = useState(false);


    //get post
    const fetchIdPost = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}?author=2`);
            const data = await res.json();
            setTimeout(() => {
                setPost(data)
                setIsLoading(false);
            }, 3000);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchIdPost()

    }, [id])

    //get media
    const fetchIdMedia = async (mediaId) => {
        try {
            const resMedia = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${mediaId}`);
            const dataMedia = await resMedia.json();
            setMediaItems(dataMedia)
        } catch (err) {
            console.log('singlePost.jsx:36, FetchIdMedia_err:', err);
        }
    }

    useEffect(() => {
        if (post.featured_media) {
            fetchIdMedia(post.featured_media)
        }

    }, [post])

    //get prev and next post Id
    const fetchPrevNextPost = async () => {
        setIsLoading(true);
        try {
            const resPrevNextPost = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts?author=2&orderby=id&order=asc&per_page=100`);
            const dataPrevNextPost = await resPrevNextPost.json();
            const currentIndex = dataPrevNextPost.findIndex((item) => item.id === parseInt(id));

            if (currentIndex > 0) {
                setPrevPost(dataPrevNextPost[currentIndex - 1]);
            } else {
                setPrevPost(null);
            }

            if (currentIndex < dataPrevNextPost.length - 1) {
                setNextPost(dataPrevNextPost[currentIndex + 1]);
            } else {
                setNextPost(null);
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 3000);

        } catch (err) {
            console.log('singlePost.jsx:67, FetchPrevNextPost_err:', err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPrevNextPost()
    }, [id])

    //handlePrevNext
    const handlePrevNext = (post) => {
        navigate(`/blog/single-post/${post.id}`);
    }

    //debugging
    // console.log('singlePost.jsx:81, mediaId:', mediaId);
    // console.log('singlePost.jsx:82, postid:', post.id);






    //get comments
    const fetchComments = async () => {
        try {
            const resComments = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments?&post=${id}`);
            const dataComments = await resComments.json();
            setComments(dataComments)
        } catch (err) {
            console.log('singlePost.jsx:59, FetchComments_err:', err);
        }
    }
    //post a new Comment
    const postComment = async () => {
        try {
            const resPostComment = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` jika perlu
                },
                body: JSON.stringify({
                    post: id,
                    content: newComment
                }),
            });

            const dataPostComment = await resPostComment.json();
            setComments([...comments, dataPostComment]);
            setNewComment('');
        } catch (err) {
            console.log('singlePost.jsx:82, postComment_err:', err);

        }
    }
    useEffect(() => {
        fetchComments()
    }, [id]);
    //handlSubmit Comment
    const handleSubmitComment = (e) => {
        e.preventDefault();
        postComment();
    }






    console.log('singlePost.jsx:153, prevPost:', prevPost);
    return (
        <LayoutMain>
            {/* Loading */}
            <div className={`${isLoading ? 'flex justify-center items-center min-h-svh' : 'hidden'}`}>
                <svg
                    className='animate-spin h-64 w-64 mx-auto text-prim-jade-500 '
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
            {/* main content */}
            <div className={`container mt-60 justify-start items-start xl:w-3/4 w-2/3 ${isLoading ? 'hidden' : ''}`}>
                <div className="content grid grid-cols-1 gap-8 my-8 min-h-screen">
                    <section className="headers grid grid-cols-1 gap-16">

                        {/* thumbnail */}
                        <img src={mediaItems?.guid?.rendered} alt={post.title?.rendered} className="w-full object-cover xl:rounded-[2rem] rounded-md" />

                        {/* title */}
                        <div className="title flex flex-col">
                            <h1 className="xl:text-5xl font-bold text-xl">{post.title?.rendered}</h1>
                            <div className="meta flex gap-4">
                                <p className="text-base">
                                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                                <p>&mdash;</p>
                                <p className="text-base">
                                    {
                                        post.author === 2 ? 'Adi Arifin' : 'Anonymous'
                                    }
                                </p>
                            </div>
                        </div>


                        {/* content */}
                        <div className="content mb-10">
                            <section className="text-base">
                                <div dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
                                />
                            </section>
                        </div>


                        {/* Comment fitur */}
                        <div className="hidden">


                            {/* hr */}
                            <hr className="border-t-2 border-prim-jade-500 mb-10" />

                            {/* Comments */}
                            <h2 className="text-5xl font-bold">Comments</h2>
                            <section className="comments grid grid-cols-1 gap-10 bg-gray-100 px-4 py-12 rounded-xl">
                                {/* DIsplay Comment and Author */}
                                <div className="comment-list ">
                                    {
                                        comments.length > 0 ? (
                                            comments.map((comment) => (
                                                <div key={comment.id} className="comment p-4 bg-white rounded-xl shadow-md space-y-2">
                                                    <h3 className="text-xl font-bold">
                                                        {comment.author_name}
                                                    </h3>
                                                    <p
                                                        className="text-base P-2 italic"
                                                        dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                                                    >
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="comment p-4 bg-white rounded-xl shadow-md space-y-2">
                                                <h3 className="text-2xl font-bold">
                                                    No Comment
                                                </h3>
                                            </div>
                                        )
                                    }
                                </div>



                                {/* Create Leave a Reply */}
                                <h3 className='text-3xl'>
                                    Leave a Reply
                                </h3>


                                <div className="comment-form">
                                    <form
                                        onSubmit={handleSubmitComment}
                                        className="grid grid-cols-1 gap-4"
                                    >
                                        {/* label for comment */}
                                        <label htmlFor="comment" className="text-base">Comment *</label>
                                        <textarea
                                            name="comment"
                                            id="comment"
                                            cols="30"
                                            rows="10"
                                            className="w-full h-40 border-2 border-gray-400 rounded-lg p-4"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />

                                        <button className="btn items-center justify-center border-2 border-transparent py-2 px-4 bg-prim-jade-500 rounded-lg text-white font-semibold text-xl">Send Comment</button>
                                    </form>
                                </div>
                            </section>
                        </div>





                    </section>

                </div>
            </div >


            {/* prev next Components*/}
            <section className={`prev-next flex justify-between mx-8 mb-8 ${isLoading ? 'hidden' : ''} `}>

                {/* Prev button */}
                {prevPost !== null ? (
                    <button
                        onClick={() => handlePrevNext(prevPost)}
                        className="flex gap-2 items-center hover:bg-prim-jade-500 hover:text-white p-4 rounded-lg"
                    >
                        {/* icon chevron Left */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 16 16">
                            <path fill="currentColor" fillRule="evenodd" d="M10.53 2.97a.75.75 0 0 1 0 1.06L6.56 8l3.97 3.97a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0" clipRule="evenodd" />
                        </svg>
                        <span className='xl:text-xl'>{prevPost?.title?.rendered}</span>
                    </button>
                ) : (
                    <div className="flex gap-2 items-center p-4 rounded-lg invisible">
                        {/* Placeholder for icon */}
                        <div className="h-8 w-8"></div>
                        {/* Placeholder for text */}
                        <div className='xl:text-xl'></div>
                    </div>
                )}

                {/* Next Button */}
                {nextPost !== null && (
                    <button
                        onClick={() => handlePrevNext(nextPost)}
                        className="flex gap-2 items-center hover:bg-prim-jade-500 hover:text-white p-4 rounded-lg"
                    >
                        <span className='xl:text-xl'>{nextPost?.title?.rendered}</span>
                        {/* icon chevron-right */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 16 16">
                            <path fill="currentColor" fillRule="evenodd" d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8L5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0" clipRule="evenodd" />
                        </svg>
                    </button>
                )}

            </section>
        </LayoutMain>
    )
}

export default SinglePost