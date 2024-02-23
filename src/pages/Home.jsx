import React from 'react'
import LayoutMain from '../components/LayoutMain'

import ImgHero from '../assets/img/hero.png'
import DownloadCv from '../assets/icons/cv_download.svg'
import cv from '../assets/CV_Adi.pdf'


import FillButton from '../components/FillButton'
import OutlineButton from '../components/OutlineButton'


function Home() {
    return (
        <LayoutMain>
            <div className="container mx-auto px-5">
                <section className='header flex flex-col-reverse sm:flex-row items-center min-h-screen'>
                    {/* content-left */}
                    <div className="content-left flex flex-col gap-6 w-full">
                        <div className='title'>
                            <h3 className='text-2xl font-bold text-prim-jade-500'>FRONT-END</h3>
                            <h3 className='text-2xl font-bold text-prim-jade-500'>WEB DEVELOPER</h3>
                        </div>
                        <div className="profil-name">
                            <h1 className='text-8xl font-extrabold'>ADI ARIFIN</h1>
                            <p>
                                I am a person who is very enthusiastic about the web.
                                I think presenting an attractive web design is a concern in developing branding for a product. To create a good website, I focus on responsive design, and clean code to make it more professional. For now, I am developing my skills to become a Full-stack Web developer.
                            </p>
                        </div>

                        <div className="actions flex gap-6">
                            <a href={cv} download>
                                <FillButton IconBtn={DownloadCv} textBtn="Download CV" />
                            </a>
                            <OutlineButton textBtn="More About Me" />
                        </div>
                    </div>

                    {/* content-right */}
                    <div className="content-right w-full">
                        <img src={ImgHero} alt="image" className="h-[49rem] object-cover" />
                    </div>

                </section>
            </div>
        </LayoutMain>
    )
}

export default Home