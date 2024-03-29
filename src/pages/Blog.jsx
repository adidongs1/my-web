import { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import DataFetch from '../utils/DataFetch'


import LayoutMain from '../layout/LayoutMain'
import Paginations from '../components/basics/Paginations'
import FillButton from '../components/basics/FillButton'

import SearchIcon from '../assets/icons/search-icon.svg'
import SadFace from '../assets/icons/sad-face.svg'

function Blog() {
    const { posts, loading, page, totalPages, keyword, query, setQuery, setPage, setKeyword, fetchPosts, images, fetchImages } = DataFetch()




    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setKeyword(query)
        setPage(1)
        fetchPosts()
    }

    //useEffect untuk memanggil fungsi fetchPosts() dari BlogProvider
    useEffect(() => {
        fetchPosts();
    }, [page, keyword]);

    //useEffect untuk memanggil fungsi fetchImages() dari BlogProvider
    useEffect(() => {
        fetchImages();
    }, [posts]);


    return (
        <LayoutMain>
            <section className='blog container mx-auto px-5 mb-10'
            >
                <div className="flex flex-col gap-16 w-full mt-40">
                    <div className='title'>
                        <h3 className='text-base font-bold mb-8' >Blog</h3>
                        <h1 className='text-5xl font-bold'>Share Knowledge,<br />
                            Gain Edge.</h1>
                    </div>

                    <div className="flex flex-row justify-end">
                        {/* search */}
                        <form onSubmit={handleSearchSubmit}>
                            <div className="join">
                                <input
                                    type="text"
                                    id='search'
                                    name='search'
                                    className="input input-bordered join-item xl:min-w-96 min-w-80"
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

                            <div className='flex justify-center items-center min-h-svh'>
                                <svg
                                    className='animate-spin h-64 w-64 mx-auto text-prim-jade-500 '
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx={12}
                                        cy={12}
                                        r={10}
                                        stroke="currentColor"
                                        strokeWidth={4}
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>


                        ) : (  // cardblog 
                            posts.length > 0 ? (
                                posts.map(post => (
                                    <div key={post.id} className='flex flex-col xl:flex-row w-full xl:h-60 shadow-lg gap-7 items-center rounded-xl'>
                                        <figure>
                                            {
                                                images[post.id] ? (
                                                    <img
                                                        src={images[post.id]}
                                                        alt={post.title.rendered}
                                                        className="xl:min-w-96 h-60 object-cover rounded-xl"
                                                    />
                                                ) : (
                                                    <div
                                                        className="skeleton xl:min-w-96 h-60 object-cover rounded-xl"
                                                    />
                                                )
                                            }
                                        </figure>

                                        <div className="content flex flex-col w-full h-full p-6 pl-0">
                                            <h2 className="card-title">
                                                {post.title.rendered}
                                            </h2>
                                            <div className='text-base' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                            <NavLink to={"/blog/single-post/" + post.id}
                                                className="flex justify-end mt-auto w-full"
                                            >
                                                <FillButton textBtn="Read More" />
                                            </NavLink>

                                        </div>


                                    </div>

                                ))
                            ) : (
                                <div className="flex flex-col xl:flex-row justify-center items-center opacity-25">
                                    <img src={SadFace} alt="sad-face" className='w-60' />
                                    <div className="flex flex-col">
                                        <h3 className='text-7xl font-bold'>No</h3>
                                        <h3 className='text-7xl font-bold'>Post</h3>
                                        <h3 className='text-7xl font-bold'>Found!</h3>

                                    </div>
                                </div>
                            )

                        )
                        }
                    </div>

                    <div className={`pagination flex justify-center items-center ${loading ? 'hidden' : ''}`}>
                        <Paginations
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                        />
                    </div>

                </div>

            </section >
        </LayoutMain >
    )
}

export default Blog