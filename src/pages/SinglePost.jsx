import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LayoutMain from '../components/LayoutMain'


function SinglePost() {

    const { id } = useParams()
    const [post, setPost] = useState([])

    const fetchIdPost = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`);
            const data = await res.json();
            setPost(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchIdPost()

    }, [])

    console.log('posts', post)


    return (
        <LayoutMain>
            <div className="container mt-32 mx-auto justify-start items-start w-1/2">
                <div className="content grid grid-cols-1 gap-8 my-8 min-h-screen">
                    <div className="title flex flex-col">
                        <div className="flex gap-2">
                            {/* badges */}
                        </div>
                        <h1 className='font-semibold text-4xl'>
                            {/* title */}
                            {post?.title?.rendered}
                        </h1>
                        <label className='text-sm text-slate-400 mt-5'>
                            {/* date */}
                            {new Date(post.date).toLocaleString('en-GB')}
                        </label>
                    </div>

                    <div className="content grid grid-cols-1 gap-8">
                        <div>
                            {/* content */}
                            <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
                        </div>
                    </div>
                </div>
            </div >
        </LayoutMain>
    )
}

export default SinglePost