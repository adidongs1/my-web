import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../services/BlogProvider";


import IconEdit from '../assets/icons/tabler_edit.svg'



function TabelDashboard() {
    const { posts, fetchPosts, page, keyword, checked, setChecked } = useContext(BlogContext)
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
            const newChecked = posts?.data?.map(post => post.id)
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


        setIsAllChecked(posts?.data?.length === newChecked.length)
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
                    <th className='text-black font-semibold text-base'>Category</th>
                    <th className='text-black font-semibold text-base'>Content</th>
                </tr>
            </thead>
            < tbody >
                {
                    // rows
                    posts?.data?.map(post => (


                        <tr key={post.id}>
                            {/* checkbox */}
                            <th>
                                <label>
                                    <input type="checkbox" className='checkbox' checked={checked.includes(post.id)} onChange={() => handleCheck(post.id)} />
                                </label>
                            </th>
                            {/* modify */}
                            <td>
                                <button className='btn btn-ghost'>
                                    <img src={IconEdit} alt="Edit" />
                                </button>
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
                            <td className='w-40'>
                                <span className='text-black font-semibold text-base'>
                                    {/* {category} */}
                                </span>
                            </td>
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

                }

            </tbody >
        </table>
    )
}

export default TabelDashboard