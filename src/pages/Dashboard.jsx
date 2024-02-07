import { useContext } from 'react'

//services
import { BlogContext } from '../services/BlogProvider'

//components
import LayoutAdmin from '../components/LayoutAdmin'
import TabelDashboard from '../components/TabelDashboard'
import Paginations from '../components/Paginations'

function Dashboard() {
    const { handleMultiDelete, totalPages, page, setPage } = useContext(BlogContext)
    return (
        <LayoutAdmin>
            <div className="container mb-24 mt-4">
                <h1 className='text-5xl font-bold px-6'>Blog Posts</h1>
                <div className='px-6 py-12'>
                    {/* tabel */}
                    <TabelDashboard />

                </div>


                <div className='flex w-full xl:justify-end justify-center mb-12'>
                    <button onClick={handleMultiDelete} className='btn items-center justify-center border-2 border-transparent xl:py-2 xl:px-4 px-8 bg-sec-pomegranate-500 rounded-lg text-white font-semibold xl:text-base text-xl' >
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

export default Dashboard