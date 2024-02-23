import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const BlogContext = createContext();

export default function BlogProvider({ children }) {

    //posts
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //search
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    //checked
    const [checked, setChecked] = useState([])

    //images
    const [images, setImages] = useState({})

    //navigate
    const navigate = useNavigate();



    //fetch images function
    const fetchImages = async () => {
        const newImages = {};
        for (const post of posts) {
            if (post.featured_media === 0) {
                newImages[post.id] = 'https://placehold.co/600x400';
                console.log('BlogProvider.jsx:35, fetchImages_featured==0: ', newImages[post.id])
            } else {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${post.featured_media}?author=2`);
                const data = await res.json();
                console.log('BlogProvider.jsx:37, fetchImages: ', data)
                newImages[post.id] = data.guid.rendered;
            }
        }
        setImages(newImages);
    }

    //fetch data posts function untuk mengambil seluruh data post
    const fetchPosts = async () => {

        try {
            setLoading(true);
            let endPoint = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts?author=2&page=${page}&search=${keyword}`
            const res = await fetch(endPoint);
            const data = await res.json();
            console.log('BlogProvider.jsx:54, fetchPosts: ', data)

            setPosts(data)
            setLoading(false);
            setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));
        } catch (err) {
            console.log(err);
            setLoading(false);
        }


    };


    //addpost
    const addPost = (newPost) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts?author=2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log("newPost:", data)
                if (data.id) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success, Post Created!',
                        text: 'Post Baru Berhasil di Buat!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#17b472'
                    }).then(() => navigate('/admin/dashboard'))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,

                    })
                }
            }

            )
            .catch((err) => {
                console.log('error newPost:', err)
            })

    }

    //handle Multi Delete function
    const handleMultiDelete = () => {

        if (!Array.isArray(checked)) return console.log('checked is not an array');

        Swal.fire({
            title: 'Apa kamu yakin menghapus ini?',
            text: "Kamu tidak akan bisa mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17b472',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
        }).then((result) => {
            const configDelete = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            if (result.isConfirmed) {
                checked.map(id => {
                    fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`, configDelete)
                        .then(res => res.json())
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Post Terhapus!',
                                text: 'Post Berhasil di Hapus!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#17b472'
                            })

                            //Menampilkan data terbaru setelah dihapus
                            fetchPosts().then(() => {
                                setChecked([])

                            })


                        })
                        .catch((err) => {
                            console.log('Delete Err:', err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Post Gagal di Hapus!',
                                text: err.message,

                            })
                        })

                })
            }
        })

    }

    //edit post
    const editPost = (id, editedPost) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(editedPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Post Telah Diedit!',
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#17b472'
                    }).then(() => navigate('/admin/dashboard'))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,

                    })
                }
            })

    }


    return (
        <BlogContext.Provider value={{ posts, setPosts, loading, setLoading, page, setPage, totalPages, setTotalPages, keyword, setKeyword, query, setQuery, addPost, fetchPosts, handleMultiDelete, editPost, checked, setChecked, images, fetchImages }}>
            {children}
        </BlogContext.Provider>
    )
}