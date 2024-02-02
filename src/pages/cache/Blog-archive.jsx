import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'
import { debounce } from 'lodash'


import LayoutMain from '../../components/LayoutMain'
import Paginations from '../../components/Paginations'
import FillButton from '../../components/FillButton'

import SearchIcon from '../assets/icons/search-icon.svg'

function Archieve() {

    // Hook State
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)


    //fetch data function 
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://eventespresso.com/wp-json/wp/v2/posts?_embed&page=${page}&search=${searchTerm}`);
            let data = await res.json();

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
        // search term hanya mencari title jika search term tidak kosong
        // Memanggil fungsi fetchPosts()
        fetchPosts();

    }, [page]);

    return (
        <LayoutMain>
            <section className="blog container mx-auto px-5 mb-10">
                <div className="flex flex-col gap-16 w-full mt-40">
                    <div className="flex flex-col gap-6">
                        <div className='lable-title'>
                            <h3 className='text-base font-bold' >Blog</h3>
                        </div>
                        <div className="Title">
                            <h1 className='text-5xl font-bold'>Share Knowledge,<br />
                                Gain Edge.</h1>
                        </div>
                    </div>


                    <div className="flex flex-row justify-end">
                        {/* search */}
                        <div className='join'>
                            <input
                                type='text'
                                id='search'
                                name='search'
                                className="input input-bordered join-item min-w-96"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e)
                                }
                            />
                            <label htmlFor='search' className="btn join-item bg-prim-jade-500">
                                <img src={SearchIcon} alt="Search" />
                            </label>
                        </div>
                    </div>

                    {/* render card blog */}
                    <div className="wrapper-card flex flex-col gap-16">
                        {/* cek posts */}
                        {

                            loading ? (


                                <div className="flex justify-center items-center">
                                    <RotatingLines
                                        visible={loading}
                                        color="#000"
                                        height={100}
                                        width={100}
                                        strokeWidth='6'
                                        animationDuration={loading ? 1500 : 0}
                                        ariaLabel='rotating-lines-loading'
                                    />
                                </div>

                            ) : (
                                // card blog
                                posts.map(post => (
                                    <div key={post.id} className="flex flex-col xl:flex-row w-full xl:h-60 s shadow-lg gap-7 p-6 items-center rounded-xl">
                                        <figure>
                                            {/* iamge/thumbnail */}
                                        </figure>

                                        <div className="content w-full">
                                            <h2 className="card-title">
                                                {post.title.rendered}
                                            </h2>
                                            <div className='flex flex-col gap-9'>
                                                <div className="max-w-[50rem] mb-auto">
                                                    <p className='text-base'>
                                                        {/* desc */}
                                                        {post.yoast_head_json.description}
                                                    </p>
                                                </div>
                                                <NavLink to={"/single-post/" + post.id} className="flex justify-end">
                                                    <FillButton textBtn="Read More" />

                                                </NavLink>
                                            </div>
                                            <section className='flex gap-2'>
                                                {/* badge/categoties */}
                                            </section>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>

                    <div className="pagination flex justify-center">

                        <Paginations page={page} totalPages={totalPages} setPage={setPage} />
                    </div>


                </div>



            </section>
        </LayoutMain>
    )
}

export default Archieve