import { useContext } from 'react'

//services
import { BlogContext } from '../services/BlogProvider'

//components
import LayoutAdmin from '../components/LayoutAdmin'
import TabelDashboard from '../components/TabelDashboard'

function Dashboard() {
    const { deletePost } = useContext(BlogContext)
    return (
        <LayoutAdmin>
            <div className="container">
                <h1 className='text-5xl font-bold px-6'>Blog Posts</h1>
                <div className='px-6 py-12'>
                    {/* tabel */}
                    <TabelDashboard />

                </div>

                <div className='flex w-full justify-end'>
                    <button onClick={() => deletePost(postId)} className='btn btn-disabled items-center border-2 border-transparent py-2 px-4 bg-sec-pomegranate-500 rounded-lg text-white font-semibold' >
                        Delete
                    </button>
                </div>

            </div >
        </LayoutAdmin>
    )
}

export default Dashboard