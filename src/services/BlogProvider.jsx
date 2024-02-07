import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2'

export const BlogContext = createContext();

export default function BlogProvider({ children }) {

    // Hook State
    const { user } = useContext(AuthContext)

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



    //fetch data posts function untuk mengambil data dari API
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api-fe-batch5.neuversity.id/api/posts?_embed&page=${page}&search=${keyword}`);
            const data = await res.json();

            setPosts(data)
            setLoading(false);
            console.log(data)
            // setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    // useEffect untuk memanggil fungsi fetchPosts() ketika page berubah
    useEffect(() => {
        fetchPosts();
    }, [page, keyword]);

    const navigate = useNavigate();
    //fetch data posts function untuk membuat post baru
    const addPost = (newPost) => {
        fetch('https://api-fe-batch5.neuversity.id/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Post Created!',
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
                console.log('error', err)
            })

    }


    //Edit Post function
    const editPost = (id, newPost) => {
        setPosts(posts.map((post) => (post.id === id ? newPost : post)));
    }

    //handle Multi Delete function
    const handleMultiDelete = () => {
        if (!Array.isArray(checked)) return console.log('checked is not an array');
        checked.map(id => {
            fetch(`https://api-fe-batch5.neuversity.id/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Post Berhasil di Hapus!',
                    })
                )
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Post Gagal di Hapus!',

                    })
                })

        })
        fetchPosts().then(() => {
            setChecked([])

        })
    }

    return (
        <BlogContext.Provider value={{ posts, setPosts, loading, setLoading, page, setPage, totalPages, setTotalPages, keyword, setKeyword, query, setQuery, addPost, editPost, fetchPosts, handleMultiDelete, checked, setChecked }}>
            {children}
        </BlogContext.Provider>
    )
}