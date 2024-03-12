//utils
import DataFetch from '../utils/DataFetch'

//components
import LayoutAdmin from '../layout/LayoutAdmin'
import TabelMedia from '../components/basics/TabelMedia'
import Paginations from '../components/basics/Paginations'

function DashboardMedia() {
    const { totalPages, page, setPage, checked, handleMultiDeleteMedia, fetchMedia, setChecked, mediaItems, keyword } = DataFetch()

    return (
        <LayoutAdmin>
            <div className="container mb-24 mt-4">
                <h1 className='text-5xl font-bold px-6'>Media Library</h1>
                <div className='px-6 py-12 overflow-x-auto'>
                    {/* tabel */}
                    <TabelMedia
                        fetchMedia={fetchMedia}
                        page={page}
                        setPage={setPage}
                        checked={checked}
                        setChecked={setChecked}
                        mediaItems={mediaItems}
                        keyword={keyword}
                    />
                </div>

                <div className='flex w-full xl:justify-end justify-center mb-12'>
                    <button
                        onClick={handleMultiDeleteMedia}
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