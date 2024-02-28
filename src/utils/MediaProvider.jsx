import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'

export const MediaContext = createContext();

export default function MediaProvider({ children }) {

    //media
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //search
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    //checked
    const [checked, setChecked] = useState([])

    //navigate
    const navigate = useNavigate();

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
    const handleMultiDelete = async () => {
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

    return (
        <MediaContext.Provider value={{
            mediaItems,
            loading,
            page,
            totalPages,
            keyword,
            query,
            checked,
            setKeyword,
            setQuery,
            setChecked,
            fetchMedia,
            handleMultiDelete,
        }}>
            {children}
        </MediaContext.Provider>
    )
}
