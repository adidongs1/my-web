import { useContext } from 'react'

//services
import { MediaContext } from '../utils/MediaProvider'

//components
import LayoutAdmin from '../components/LayoutAdmin'
import TabelMedia from '../components/TabelMedia'
import Paginations from '../components/Paginations'

function DashboardMedia() {
    const { totalPages, page, setPage, checked, handleMultiDelete } = useContext(MediaContext)

    return (
        <LayoutAdmin>
            <div className="container mb-24 mt-4">
                <h1 className='text-5xl font-bold px-6'>Media Library</h1>
                <div className='px-6 py-12 overflow-x-auto'>
                    {/* tabel */}
                    <TabelMedia />
                </div>

                <div className='flex w-full xl:justify-end justify-center mb-12'>
                    <button
                        onClick={handleMultiDelete}
                        className='btn items-center justify-center border-2 border-transparent xl:py-2 xl:px-4 px-8 bg-sec-pomegranate-500 rounded-lg text-white font-semibold xl:text-base text-xl'
                        disabled={checked.length === 0}
                    >
                        Delete
                    </button>
                </div>

                <div className="paginations flex justify-center items-center">
                    <Paginations totalPages={totalPages} page={page} setPage={setPage} />
                </div>
            </div >
        </LayoutAdmin>
    )
}

export default DashboardMedia