import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function DataFetch() {

    //posts
    const [posts, setPosts] = useState([]);


    //media
    const [mediaItems, setMediaItems] = useState([]);

    //search
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    //checked
    const [checked, setChecked] = useState([])

    //images
    const [images, setImages] = useState({})

    //navigate
    const navigate = useNavigate();

    //loading
    const [loading, setLoading] = useState(false)

    //pages
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //fetch images function
    const fetchImages = async () => {
        const newImages = { ...images };
        for (let post of posts) {
            if (post.featured_media === 0) {
                newImages[post.id] = 'https://placehold.co/600x400';
                console.log('BlogProvider.jsx:35, fetchImages_featured==0: ', newImages[post.id])
            } else if (!newImages[post.id]) {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${post.featured_media}?author=2`);
                const data = await res.json();
                newImages[post.id] = data.guid.rendered;
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
            // console.log('BlogProvider.jsx:54, fetchPosts: ', data)
            setTimeout(() => {
                setPosts(data)
                setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));
                setLoading(false);
            }, 3000);
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
                    }).then(() => navigate('/onepiece/dashboard'))
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

    //handle Multi Delete Post function
    const handleMultiDeletePost = () => {

        if (!Array.isArray(checked)) return console.log('checked is not an array');

        Swal.fire({
            title: `Yakin ingin menghapus ${checked.length} post?`,
            html: `
            Post dengan id <strong>${checked.join(', ')}</strong> akan dihapus!</br> 
            <strong>Perhatian!</strong> Tindakan ini tidak dapat dikembalikan!
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17b472',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
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
                                text: `Post dengan id ${id} telah dihapus!`,
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
                        title: 'Edit Berhasil!',
                        html: `Post dengan id <strong>${id}</strong> telah diubah!`,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#17b472'
                    }).then(() => navigate('/onepiece/dashboard'))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,

                    })
                }
            })

    }

    //fetch data media function untuk mengambil seluruh data media
    const fetchMedia = async () => {

        try {
            setLoading(true);
            let endPoint = `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media?author=2&page=${page}&search=${keyword}`
            const res = await fetch(endPoint);
            const data = await res.json();
            console.log('MediaProvider.jsx:34, fetchMedia: ', data)

            setMediaItems(data)
            setLoading(false);
            setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));
        } catch (err) {
            console.log('MediaProvider.jsx:40, fetchMedia_err: ', err)
            setLoading(false);
        }
    };

    //handle multi delete media
    const handleMultiDeleteMedia = async () => {
        const confirm = await Swal.fire({
            title: 'Apakah kamu yakin?',
            text: 'Kamu tidak akan bisa mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#17b472',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            const configDelete = {
                method: 'DELETE',
                headers: {

                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }

            }
            if (result.isConfirmed) {
                checked.map(id => {
                    fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${id}?force=true`, configDelete)
                        .then(res => res.json())
                        .then((e) => {
                            console.log('MediaProvider.jsx:70, handleMultiDelete_res:', e)
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil!',
                                text: 'Media berhasil dihapus!',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#17b472'
                            })
                            fetchMedia().then(() => {
                                setChecked([])
                            })
                        })
                        // ;
                        .catch((err) => {
                            console.log('MediaProvider.jsx:85, handleMultiDelete_err:', err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Waduh...!',
                                text: 'Gagal menghapus media!',
                            });
                        })
                })
            }
        });
    }

    return {
        //post
        posts,
        setPosts,
        fetchPosts,
        addPost,
        editPost,
        fetchImages,
        images,
        setImages,
        checked,
        setChecked,
        handleMultiDeletePost,

        // media
        mediaItems,
        setMediaItems,
        fetchMedia,
        handleMultiDeleteMedia,
        keyword,
        setKeyword,
        query,
        setQuery,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages
    }

}