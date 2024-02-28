import { useContext, useState } from "react";
import { BlogContext } from "../utils/BlogProvider";

// Froala-Editor.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

// SweetAlert2
import Swal from "sweetalert2";

//Layout
import LayoutAdmin from "./LayoutAdmin";

function NewPostFrom() {
    const { addPost } = useContext(BlogContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [isLoading, setIsLoading] = useState(false)



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




    const handleSubmitNewPost = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        let thumbnailId = ''
        if (thumbnail) {
            const formData = new FormData();
            formData.append('file', thumbnail);

            const uploadRes = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData

            });

            if (uploadRes.ok) {
                const data = await uploadRes.json();
                thumbnailId = data.id;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Waduh...!',
                    text: 'Gagal mengunggah thumbnail!',
                });
                setIsLoading(false);
                return;
            }
        }


        const newPost = {
            title,
            content,
            status: 'publish',
            featured_media: thumbnailId || 0,
        }
        // reset form
        addPost(newPost)
        setTitle('')
        setContent('')
        setThumbnail('')

        setIsLoading(false)
    };

    let token = null;
    let imageUploadURL = null;
    let imageUploadMethod = null;
    let requestHeaders = null;

    try {
        token = localStorage.getItem('token');
        imageUploadURL = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media`;
        imageUploadMethod = 'POST';
        requestHeaders = {
            'Authorization': `Bearer ${token}`
        }
    } catch (error) {
        console.log('NewPostForm.jsx:113, Upload error: ', error);
        imageUploadURL = null;
        imageUploadMethod = null;
        requestHeaders = null;
    }


    return (
        <LayoutAdmin>
            <div className="container">
                <h1 className='text-5xl font-bold px-6'>New Post</h1>
                <form onSubmit={handleSubmitNewPost} className='px-6 py-12 flex flex-col gap-4'>

                    {/* title */}
                    <div className="form-control w-full">
                        <label htmlFor="title-post" className='text-lg font-bold text-start text-black '>Title</label>
                        <input
                            type="text"
                            id="title-post"
                            name="title-post"
                            placeholder="Enter Title Here..."
                            aria-describedby="title-post"
                            aria-invalid="false"
                            autoComplete="off"
                            autoCapitalize="on"
                            value={title}
                            onChange={
                                (e) => setTitle(e.target.value)
                            }
                            className='min-h-12 rounded-lg px-4 py-2 w-full input input-bordered focus:ring-2 focus:ring-prim-jade-500 focus:border-transparent'
                        />
                    </div>

                    {/* Thumbnail */}
                    <label className="form-control w-full">
                        <label htmlFor="thumbnail-post" className='text-lg font-bold text-start text-black '>Thumbnail/Photo</label>
                        {/* form Input File */}
                        <input
                            type="file"
                            id="thumbnail-post"
                            className="file-input file-input-bordered w-full"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={hanldeImgChange}

                        />
                        <div className="label">
                            <span className="label-text-alt opacity-0">Opacity 0</span>
                            <span className="label-text-alt text-sec-pomegranate-500">
                                *Max size 10MB, format: jpg, jpeg, png
                            </span>
                        </div>
                    </label>

                    {/* Content */}
                    <div className="form-control w-full">
                        <label htmlFor="content-post" className='text-lg font-bold text-start text-black '>Content</label>

                        <FroalaEditorComponent
                            tag='textarea'
                            model={content}
                            onModelChange={(e) => setContent(e)}
                            config={{
                                placeholderText: 'Enter Content Here...',
                                charCounterCount: false,
                                imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                                imageUploadURL: imageUploadURL,
                                imageUploadMethod: imageUploadMethod,
                                requestHeaders: requestHeaders,

                            }}
                            name="content-post"
                        />

                    </div>



                    <input
                        type="submit"
                        id="submit-post"
                        className="mt-12 py-2 px-4 rounded-lg bg-prim-jade-500 text-white border-2 border-transparent hover:bg-transparent  hover:text-prim-jade-500 hover:border-2 hover:border-solid hover:border-prim-jade-500"
                        value={isLoading ? 'Loading...' : 'Submit'}
                        disabled={isLoading}
                    />

                </form>
            </div>
        </LayoutAdmin>
    )
}

export default NewPostFrom