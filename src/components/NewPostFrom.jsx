import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../services/BlogProvider";

import LayoutAdmin from "./LayoutAdmin";

// import TextEditor from "./TextEditor";


function NewPostFrom() {
    const { addPost } = useContext(BlogContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')



    const handleSubmitNewPost = (e) => {
        setTitle('')
        setContent('')
        e.preventDefault()
        const newPost = {
            title,
            content
        }
        // reset form
        addPost(newPost)
    };



    return (
        <LayoutAdmin>
            <div className="container">
                <h1 className='text-5xl font-bold px-6'>New Post</h1>
                <form onSubmit={handleSubmitNewPost} className='px-6 py-12 flex flex-col gap-4'>
                    <div className="form-control w-full">
                        <label htmlFor="title-post" className='text-lg font-bold text-start text-black line tracking-wider'>Title</label>
                        <input
                            type="text"
                            id="title-post"
                            name="title-post"
                            placeholder="Enter Title"
                            aria-describedby="title-post"
                            aria-invalid="false"
                            value={title}
                            onChange={
                                (e) => setTitle(e.target.value)
                            }
                            className='min-h-12 rounded-lg px-4 py-2 w-full input input-bordered focus:ring-2 focus:ring-prim-jade-500 focus:border-transparent'
                        />
                    </div>
                    <div className="form-control w-full">
                        <label htmlFor="content-post" className='text-lg font-bold text-start text-black line tracking-wider'>Content</label>

                        {/* <TextEditor onChange={(e) => setContent(e.target.value)} /> */}
                        <input type="text" id="content-post" name="content-post" placeholder="Enter Content" aria-describedby="content-post" aria-invalid="false" value={content} onChange={(e) => setContent(e.target.value)} className='min-h-12 rounded-lg px-4 py-2 w-full input input-bordered focus:ring-2 focus:ring-prim-jade-500 focus:border-transparent' />

                    </div>




                    <input type="submit" className=" py-2 px-4 rounded-lg max-w-xs bg-prim-jade-500 text-white border-2 border-none hover:bg-transparent  hover:text-prim-jade-500 hover:border-2 hover:border-solid hover:border-prim-jade-500" value="Submit" />

                </form>
            </div>
        </LayoutAdmin>
    )
}

export default NewPostFrom