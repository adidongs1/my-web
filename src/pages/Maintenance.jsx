
import { NavLink } from 'react-router-dom'

import ImgHero from '../assets/img/illustrasi.jpg'
import FillButton from '../components/FillButton'

function Maintenance() {
    return (
        <>
            <div className="container mx-auto px-5">
                <section className='header flex flex-col-reverse sm:flex-row items-center min-h-screen'>
                    {/* content-left */}
                    <div className="content-left flex flex-col gap-6 w-full">
                        <div className='title'>
                            <h3 className='text-2xl font-bold text-gray-400'>Mohon Maaf 🙏🏽</h3>
                        </div>
                        <div className="subtitle">
                            <h1 className='text-8xl font-bold'>Halaman ini belum Tersedia (Maintenance)</h1>
                            <p>
                                Website sedang dalam proses pengembangan, mohon maaf atas ketidaknyamanannya. Terima kasih.
                            </p>
                        </div>

                        <div className="actions flex gap-6">
                            <NavLink to="/" >
                                <FillButton textBtn="Kembali ke Beranda" />
                            </NavLink>
                        </div>
                    </div>

                    {/* content-right */}
                    <div className="content-right w-full">
                        <img src={ImgHero} alt="image" className="h-min-screen object-cover" />
                    </div>

                </section>
            </div>
        </>
    )
}

export default Maintenance