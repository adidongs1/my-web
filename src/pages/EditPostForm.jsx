import { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { BlogContext } from "../utils/BlogProvider";

//layout
import LayoutAdmin from "../components/LayoutAdmin";


// Froala-Editor.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

// icons
import chevronLeft from '../assets/icons/chevron-left.svg'


function EditPostForm() {
    const { id } = useParams()
    const { editPost } = useContext(BlogContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [mediaId, setMediaId] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        // get post by id using fetch 
        fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`)
            .then(res => res.json())
            .then(e => {
                setTitle(e.title.rendered)
                setContent(e.content.rendered)
                // get Id media from Featured_Media
                setMediaId(e.featured_media)
            })
    }, [])

    const hanldeImgChange = (e) => {
        const imgFile = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // XMB dalam bytes
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (imgFile.size > maxSize) {
            Swal.fire({
                icon: 'error',
                title: 'Waduh...!',
                text: 'Ukuran gambar terlalu besar! Maksimal 10MB',
            });
            e.target.value = ''; // reset input file
        } else if (!allowedTypes.includes(imgFile.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Waduh...!',
                text: 'Format gambar tidak diizinkan! Hanya JPG, JPEG, PNG',
            });
            e.target.value = ''; // reset input files
        } else {
            setThumbnail(imgFile);
        }
    }


    const handleSubmitEditPost = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if (thumbnail && mediaId) {
            const formData = new FormData();
            formData.append('file', thumbnail);

            const uploadRes = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${mediaId}?author=2`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!uploadRes.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Waduh...!',
                    text: 'Gagal mengupdate gambar!',
                });
            }

        }

        const editedPost = {
            title,
            content,
            featured_media: mediaId,
        }
        // editPost with fetch
        editPost(id, editedPost)

        setIsLoading(false)

    }


    return (
        <LayoutAdmin>
            <div className="container">
                <h1 className='text-5xl font-bold px-6'>Edit Post</h1>
                <h2 className='text-2xl font-bold px-6'>Id Post: {id}</h2>
                <form onSubmit={handleSubmitEditPost} className='px-6 py-12 flex flex-col gap-4'>

                    {/* title */}
                    <div className="form-control w-full">
                        <label htmlFor="title-post" className='text-lg font-bold text-start text-black line tracking-wider'>Title</label>
                        <input
                            type="text"
                            id="title-post"
                            name="title-post"
                            placeholder="Enter Title Here..."
                            aria-describedby="title-post"
                            aria-invalid="false"
                            value={title}
                            onChange={
                                (e) => setTitle(e.target.value)
                            }
                            className='min-h-12 rounded-lg px-4 py-2 w-full input input-bordered focus:ring-2 focus:ring-prim-jade-500 focus:border-transparent'
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="form-control w-full">
                        <label htmlFor="thumbnail-post" className='text-lg font-bold text-start text-black line tracking-wider'>Thumbnail/Photo</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={hanldeImgChange}
                            className='file-input file-input-bordered w-full'
                        />
                    </div>

                    {/* Content */}
                    <div className="form-control w-full">
                        <label htmlFor="content-post" className='text-lg font-bold text-start text-black line tracking-wider'>Content</label>

                        <FroalaEditorComponent
                            tag='textarea'
                            model={content}
                            onModelChange={(e) => setContent(e)}
                            config={{
                                placeholderText: 'Enter Content Here...',
                                charCounterCount: false,
                                imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                                imageUploadURL: `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media`,
                                imageUploadMethod: 'POST',
                                requestHeaders: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`

                                }

                            }}
                        />
                    </div>




                    <input
                        type="submit"
                        className="mt-12 py-2 px-4 rounded-lg bg-prim-jade-500 text-white border-2 border-transparent hover:bg-transparent  hover:text-prim-jade-500 hover:border-2 hover:border-solid hover:border-prim-jade-500"
                        value={isLoading ? 'Loading...' : 'Save'}
                    />

                </form>

                <NavLink to='/admin/dashboard' className='flex justify-start items-center gap-2 px-6'>
                    <img src={chevronLeft} alt="back" />
                    <span className='font-bold hover:underline'>Back</span>
                </NavLink>


            </div>
        </LayoutAdmin>

    )
}

export default EditPostForm