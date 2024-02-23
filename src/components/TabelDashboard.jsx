import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { BlogContext } from "../utils/BlogProvider";

import IconAdd from '../assets/icons/icon_add.svg'
import IconEdit from '../assets/icons/tabler_edit.svg'



function TabelDashboard() {
    const { posts, setPosts, fetchPosts, page, keyword, checked, setChecked, editPost } = useContext(BlogContext)
    const [isAllChecked, setIsAllChecked] = useState(false)

    //useEffect untuk memanggil fungsi fetchPosts() dari BlogProvider
    useEffect(() => {
        fetchPosts();
    }, [page, keyword]);


    // all-check
    const handleAllCheck = () => {
        // jika semua checkbox tercheck, maka uncheck semuax
        if (isAllChecked) {
            setChecked([])
            console.log([]);
        } else {
            const newChecked = posts.map(post => post.id)
            setChecked(newChecked)
            console.log('newChecked-all', newChecked)
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
        console.log('checked-single', newChecked)
    }




    return (
        <table className='table'>
            {/* head */}
            <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className='checkbox' checked={isAllChecked} onChange={handleAllCheck} />

                        </label>
                    </th>
                    <th className='text-black font-semibold text-base'>Modify</th>
                    <th className='text-black font-semibold text-base'>Date</th>
                    <th className='text-black font-semibold text-base'>Title</th>
                    <th className='text-black font-semibold text-base'>Content</th>
                </tr>
            </thead>
            < tbody >
                {
                    // rows
                    posts.length > 0 ? (
                        posts.map(post => (


                            <tr key={post.id}>
                                {/* checkbox */}
                                <th>
                                    <label>
                                        <input type="checkbox" className='checkbox' checked={checked.includes(post.id)} onChange={() => handleCheck(post.id)} />
                                    </label>
                                </th>
                                {/* modify */}
                                <td>
                                    <NavLink to={`/admin/edit-post/${post.id}`} className='flex items-center justify-center'>
                                        <img src={IconEdit} alt="edit" />
                                    </NavLink>

                                </td>

                                {/* dibawah ini pake data */}
                                {/* date */}
                                <td>
                                    <span className='text-black font-semibold text-base'>{new Date(post.date).toLocaleString('en-GB')} </span>
                                </td>
                                {/* title */}
                                <td className='w-40'>
                                    <span className='text-black font-semibold text-base'>
                                        {post.title.rendered}
                                    </span>
                                </td>

                                {/* category */}
                                {/* <td className='w-40'>
                                <span className='text-black font-semibold text-base'>
                                    {post._embedded['wp:term'][0][0].name}
                                </span>
                            </td> */}


                                {/* content */}
                                <td className='w-48'>
                                    <div className="overflow-x-auto relative">
                                        <div className='flex flex-col scroll-my-1 h-40'>
                                            <p>
                                                {post.content.rendered}
                                            </p>
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
    )
}

export default TabelDashboard