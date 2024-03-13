import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import IconAdd from '../../assets/icons/icon_add.svg'
import IconEdit from '../../assets/icons/tabler_edit.svg'
import SearchIcon from '../../assets/icons/search-icon.svg'
import formatDate from "../../utils/formatDate";



function TabelDashboard({ posts, fetchPosts, page, keyword, setKeyword, setPage, checked, setChecked }) {

    const [isAllChecked, setIsAllChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setKeyword(query)
        setPage(1)
    }


    //useEffect untuk memanggil fungsi fetchPosts() dari BlogProvider
    useEffect(() => {
        setIsLoading(true)
        fetchPosts().finally(() => {
            setTimeout(() => setIsLoading(false), 3000)
        });
    }, [page, keyword]);


    // all-check
    const handleAllCheck = () => {
        // jika semua checkbox tercheck, maka uncheck semuax
        if (isAllChecked) {
            setChecked([])
            console.log('TabelDasboard.jsx:26, handleAllCheck:', []);
        } else {
            const newChecked = posts.map(post => post.id)
            setChecked(newChecked)
            console.log('TabelDasboard.jsx:30, newChecked-all:', newChecked)
        }
        setIsAllChecked(!isAllChecked)
    }

    //single-check
    const handleCheck = (id) => {
        //jika semua checkbox tercheck, maka all-check tercheck
        const newChecked = checked.includes(id) ?
            checked.filter(item => item !== id)
            :
            [...checked, id];


        setIsAllChecked(posts.length === newChecked.length)
        setChecked(newChecked)
        console.log('TabelDasboard.jsx:46, checked-single:', newChecked)
    }



    return (
        isLoading ? (
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
        ) : ( //end of isLoading
            <>
                {/* search */}
                <div className="flex flex-row justify-end my-12 ">
                    <form onSubmit={handleSearchSubmit} >
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


                <table className=' table w-full'>
                    {/* head */}
                    <thead>
                        <tr className="py-4 h-12">
                            <th className="w-20 py-2">
                                <label className="flex items-center">
                                    <input type="checkbox"
                                        className='checkbox border-2 border-gray-400 w-5 h-5'
                                        checked={isAllChecked}
                                        onChange={handleAllCheck}
                                    />

                                </label>
                            </th>
                            <th className='text-black font-semibold text-base text-center'>Modify</th>
                            <th className="text-black font-semibold text-base text-start">ID</th>
                            <th className='text-black font-semibold text-base text-start'>Date</th>
                            <th className='text-black font-semibold text-base text-start'>Title</th>
                            <th className='text-black font-semibold text-base text-start'>Content</th>
                        </tr>
                    </thead>
                    < tbody >
                        {
                            // rows
                            posts.length > 0 ? (
                                posts.map((post, index) => (


                                    <tr key={post.id} className={index % 2 === 0 ? 'bg-prim-jade-100' : ''}>
                                        {/* checkbox */}
                                        <td>
                                            <label>
                                                <input type="checkbox"
                                                    className='checkbox border-2 border-gray-400 w-5 h-5'
                                                    checked={checked.includes(post.id)}
                                                    onChange={() => handleCheck(post.id)}
                                                />
                                            </label>
                                        </td>
                                        {/* modify */}
                                        <td>
                                            <NavLink to={`/onepiece/edit-post/${post.id}`} className='flex items-center justify-center'>
                                                <img src={IconEdit} alt="edit" />
                                            </NavLink>

                                        </td>

                                        {/* dibawah ini pake data */}
                                        {/* ID */}
                                        <td>
                                            <span className='text-black text-base'>{post.id}</span>
                                        </td>
                                        {/* date */}
                                        <td>
                                            <span className='text-black text-base'>{formatDate(post.date)} </span>
                                        </td>
                                        {/* title */}
                                        <td>
                                            <span className='text-black text-base'>
                                                {post.title.rendered}
                                            </span>
                                        </td>


                                        {/* content */}
                                        <td>
                                            <div className="overflow-x-auto relative">
                                                <div className='flex flex-col scroll-my-1 h-40'>
                                                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))


                            ) : (
                                <tr>
                                    <td colSpan='5'>
                                        <NavLink to='/admin/new-post' className="flex flex-col gap-3 xl:flex-row justify-center items-center border-2 border-dashed py-4 hover:opacity-45">
                                            <img src={IconAdd} alt="Add-Post" className='w-14' />
                                            <div className="flex flex-col gap-0">
                                                <h3 className='text-base font-semibold'>Add New</h3>
                                                <h3 className='text-base font-semibold -mt-2'>Post!</h3>
                                            </div>
                                        </NavLink>
                                    </td>
                                </tr>
                            )

                        }

                    </tbody >
                </table>
            </>
        ) //end isLoading else statement
    )
}

export default TabelDashboard