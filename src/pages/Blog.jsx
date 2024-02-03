import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'


import LayoutMain from '../components/LayoutMain'
import Paginations from '../components/Paginations'
import FillButton from '../components/FillButton'

import SearchIcon from '../assets/icons/search-icon.svg'

function Blog() {
    // Hook State
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

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

    const searchPost = (e) => {
        e.preventDefault();
        setPage(1);
        setKeyword(query);

        console.log('isQuery', query)
    }


    return (
        <LayoutMain>
            <section className='blog container mx-auto px-5 mb-10'
            >
                <div className="flex flex-col gap-16 w-full mt-40">
                    <div className='lable-title'>
                        <h3 className='text-base font-bold' >Blog</h3>
                    </div>
                    <div className="Title">
                        <h1 className='text-5xl font-bold'>Share Knowledge,<br />
                            Gain Edge.</h1>
                    </div>

                    <div className="flex flex-row justify-end">
                        {/* search */}
                        <form onSubmit={searchPost}>
                            <div className="join">
                                <input
                                    type="text"
                                    id='search'
                                    name='search'
                                    className="input input-bordered join-item min-w-96"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}

                                />
                                <button type='submit' className="btn join-item bg-prim-jade-500">
                                    <img src={SearchIcon} alt="" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* render card blog  */}
                    <div className="wrapper-card flex flex-col gap-16">
                        {loading ? (

                            <div className="flex justify-center items-center">
                                <RotatingLines
                                    visible={loading}
                                    color="#000"
                                    height={100}
                                    width={100}
                                    strokeWidth='6'
                                    animationDuration={loading ? 1000 : 0}
                                    ariaLabel='rotating-lines-loading'
                                />
                            </div>
                        ) : (  // cardblog 

                            posts?.data?.map(post => (
                                <div key={post.id} className='flex flex-col xl:flex-row w-full xl:h-60 s shadow-lg gap-7 p-6 items-center rounded-xl'>
                                    <figure>
                                        {/* image */}
                                    </figure>

                                    <div className="content w-full">
                                        <h2 className="card-title">
                                            {post.title.rendered}
                                        </h2>
                                        <div className='flex flex-col gap-9'>
                                            <div className="w-full mb-auto">
                                                <section className='text-base'>
                                                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                                    />
                                                </section>
                                                <section className='flex gap-2'>
                                                    {/* badge */}
                                                </section>
                                            </div>
                                            <NavLink to={"/blog/single-post/" + post.id}
                                                className="flex justify-end"
                                            >
                                                <FillButton textBtn="Read More" />
                                            </NavLink>

                                        </div>


                                    </div>
                                </div>
                            ))

                        )
                        }
                    </div>

                    <div className=" pagination flex justify-center items-center">
                        <Paginations
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                    </div>

                </div>

            </section>
        </LayoutMain >
    )
}

export default Blog