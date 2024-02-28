import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { MediaContext } from "../utils/MediaProvider";

import SadFace from '../assets/icons/sad-face.svg'

function TabelMedia() {
    const { fetchMedia, checked, setChecked, mediaItems, page, keyword } = useContext(MediaContext)
    const [isAllChecked, setIsAllChecked] = useState(false)

    //useEffect untuk memanggil fungsi fetchMedia() dari MediaProvider
    useEffect(() => {
        fetchMedia();
    }, [page, keyword]);

    // all-check
    const handleAllCheck = () => {
        // jika semua checkbox tercheck, maka uncheck semuax
        if (isAllChecked) {
            setChecked([])
            console.log('TabelMedia.jsx:23, handleAllCheck:', []);
        } else {
            const newChecked = mediaItems.map(media => media.id)
            setChecked(newChecked)
            console.log('TabelMedia.jsx:27, newChecked-all:', newChecked)
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

        setIsAllChecked(mediaItems.length === newChecked.length)
        setChecked(newChecked)
        console.log('TabelMedia.jsx:43, checked-single:', newChecked)

    }

    return (
        <table className='w-full'>
            {/* head */}
            <thead>
                <tr className="py-4 h-12">
                    <th className="w-20 py-2">
                        <label className="flex justify-center items-center">
                            <input type="checkbox"
                                className='checkbox border-2 border-gray-400 w-5 h-5'
                                checked={isAllChecked}
                                onChange={handleAllCheck}
                            />

                        </label>
                    </th>
                    <th className='text-black font-semibold text-base text-start'>File</th>
                    <th className='text-black font-semibold text-base text-start'>Date</th>
                </tr>
            </thead >
            < tbody >
                {
                    // rows
                    mediaItems.length > 0 ? (
                        mediaItems.map((media, index) => (
                            <tr key={media.id} className={`px-4 py-5 h-52 ${index % 2 === 0 ? 'bg-prim-jade-100' : ''}`}>
                                {/* checkbox */}
                                <td className="xl:min-w-20 min-w-12">
                                    <label className="flex justify-center">
                                        <input type="checkbox"
                                            className='checkbox border-2 border-gray-400 w-5 h-5'
                                            checked={checked.includes(media.id)}
                                            onChange={() => handleCheck(media.id)}
                                        />
                                    </label>
                                </td>
                                {/* File */}
                                <td className='xl:min-w-[50vw] min-w-[100vw]'>

                                    <div className='flex gap-2 h-40'>
                                        <img src={media.media_details.sizes.thumbnail.source_url} alt={media.title.rendered} className='w-40 h-40 object-cover rounded-lg' />
                                        <div className='flex flex-col justify-center gap-2'>
                                            <h3 className='text-black font-semibold text-base'>{media.title.rendered}</h3>
                                            <div className='flex flex-col gap-0'>
                                                <h4 className='text-black font-semibold text-sm'>{media.media_details.sizes.full.file}</h4>
                                                <h4 className='text-black text-sm'>
                                                    {media.media_details.filesize > 1024 * 1024 ? `${(media.media_details.filesize / (1024 * 1024)).toFixed(2)} MB` : `${(media.media_details.filesize / 1024).toFixed(2)} KB`}

                                                </h4>


                                                {/* <NavLink to={`/admin/edit-media/${media.id}`} className='flex items-center justify-center'>
                                                    <img src={IconEdit} alt="edit" />
                                                </NavLink> */}

                                            </div>
                                        </div>
                                    </div>

                                </td>
                                {/* date */}
                                <td>
                                    <span className='text-black font-semibold text-base'>{new Date(media.date).toLocaleString('en-GB')} </span>
                                </td>

                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan='3'>
                                <div className="flex flex-col xl:flex-row justify-center items-center opacity-25">
                                    <img src={SadFace} alt="sad-face" className='w-60' />
                                    <div className="flex flex-col">
                                        <h3 className='text-7xl font-bold'>No</h3>
                                        <h3 className='text-7xl font-bold'>Media</h3>
                                        <h3 className='text-7xl font-bold'>Found!</h3>

                                    </div>
                                </div>
                            </td>
                        </tr>
                    )

                }

            </tbody >
        </table >
    )
}

export default TabelMedia