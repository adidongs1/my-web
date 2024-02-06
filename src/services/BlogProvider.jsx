import { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

export default function BlogProvider({ children }) {

    // Hook State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    //Add Post
    const addPost = (post) => {
        setPosts([...posts, post]);
    }

    //Delete Post
    const deletePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    }

    //Edit Post
    const editPost = (id, newPost) => {
        setPosts(posts.map((post) => (post.id === id ? newPost : post)));
    }


    //fetch data function
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api-fe-batch5.neuversity.id/api/posts?_embed&page=${page}&search=${keyword}`);
            const data = await res.json();

            setPosts(data)
            setLoading(false);
            setTotalPages(parseInt(res.headers.get('X-WP-TotalPages')));
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    // useEffect untuk memanggil fungsi fetchPosts() ketika page berubah
    useEffect(() => {
        fetchPosts();

    }, [page, keyword]);

    return (
        <BlogContext.Provider value={{ posts, setPosts, loading, setLoading, page, setPage, totalPages, setTotalPages, keyword, setKeyword, query, setQuery, addPost, deletePost, editPost, fetchPosts }}>
            {children}
        </BlogContext.Provider>
    )
}