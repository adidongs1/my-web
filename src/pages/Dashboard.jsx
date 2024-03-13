//utils
import DataFetch from '../utils/DataFetch'

//components
import LayoutAdmin from '../layout/LayoutAdmin'
import TabelDashboard from '../components/basics/TabelDashboard'
import Paginations from '../components/basics/Paginations'

function Dashboard() {
    const { handleMultiDeletePost, totalPages, page, setPage, checked, posts, fetchPosts, keyword, setChecked, query, setQuery, setKeyword } = DataFetch()


    return (

        <LayoutAdmin>
            <div className="container mb-24 mt-4">
                <h1 className='text-5xl font-bold px-6'>Blog Posts</h1>
                <div className='px-6 py-12 overflow-x-auto'>
                    {/* tabel */}
                    <TabelDashboard
                        posts={posts}
                        fetchPosts={fetchPosts}
                        page={page}
                        keyword={keyword}
                        setKeyword={setKeyword}
                        setPage={setPage}
                        checked={checked}
                        setChecked={setChecked}
                    />

                </div>


                <div className='flex w-full xl:justify-end justify-center mb-12'>
                    <button
                        onClick={handleMultiDeletePost}
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

export default Dashboard