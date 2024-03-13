import React from 'react'
import LayoutMain from '../layout/LayoutMain'

import ImgHero from '../assets/img/hero.png'
import DownloadCv from '../assets/icons/cv_download.svg'
import cv from '../assets/CV_Adi.pdf'


import FillButton from '../components/basics/FillButton'
import OutlineButton from '../components/basics/OutlineButton'

import WebIcon from '../assets/icons/web-icon.svg'
import GraphicIcon from '../assets/icons/graphic-icon.svg'
import UiIcon from '../assets/icons/ui-icon.svg'

import FigmaIcon from '../assets/icons/logos_figma.svg'
import GithubIcon from '../assets/icons/mdi_github.svg'
import TailwindIcon from '../assets/icons/devicon_tailwindcss.svg'
import ReactIcon from '../assets/icons/logos_react.svg'
import VSIcon from '../assets/icons/devicon_vscode.svg'


function Home() {
    return (
        <LayoutMain>
            <div className="container mx-auto xl:px-16 px-5 grid grid-cols-1 xl:gap-40 gap-20">
                <section className='header flex flex-col-reverse md:flex-row items-center gap-20'>
                    {/* content-left */}
                    <div className="content-left flex flex-col gap-6 w-full">
                        <div className='title'>
                            <h3 className='text-2xl font-bold text-prim-jade-500'>FRONT-END</h3>
                            <h3 className='text-2xl font-bold text-prim-jade-500'>WEB DEVELOPER</h3>
                        </div>
                        <div className="profil-name">
                            <h1 className='text-7xl lg:text-8xl font-extrabold mb-4'>ADI ARIFIN</h1>
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
                        <img src={ImgHero} alt="image" className=" object-contain w-full" />
                    </div>

                </section>

                {/* section skill */}
                <section className='skill flex flex-col sm:flex-row items-center'>
                    <div className="flex flex-col gap-16 w-full">
                        <div className='title'>
                            <h3 className='text-base font-semibold mb-4' >What I do</h3>
                            <h1 className='text-5xl font-bold'>Turning Designs into <br />
                                Dynamic Experiences</h1>
                        </div>

                        {/* card skills */}
                        <div className="cards w-full flex flex-col md:flex-row xl:gap-20 gap-4 justify-between">
                            {/* web development */}
                            <div className="w-full p-4">
                                <div className="flex flex-col">
                                    <img src={WebIcon} alt="web-icon" className="w-20 h-20 py-4 bg-base-100 rounded-xl shadow-lg" />
                                    <h2 className="card-title py-4">Web Development</h2>
                                    <p className='text-justify'>
                                        I combine high technical skills with creativity to create websites that are not only eye-catching but also provide a great user experience. With expertise in web programming, I build a strong foundation for every web project.
                                    </p>

                                </div>
                            </div>

                            {/* Graphic Designer */}
                            <div className="w-full p-4">
                                <div className="flex flex-col">
                                    <img src={GraphicIcon} alt="graphic-icon" className="w-20 h-20 py-4 bg-base-100 rounded-xl shadow-lg" />
                                    <h2 className="card-title py-4">Graphic Designer</h2>
                                    <p className='text-justify'>
                                        I am committed to delivering stunning visual designs and am passionate about translating design concepts into designs that have an identity. I think that mastering a little graphic design can go a long way in building a visually appealing website.
                                    </p>

                                </div>
                            </div>

                            {/* User Interface (UI) Development */}
                            <div className="w-full p-4">
                                <div className="flex flex-col">
                                    <img src={UiIcon} alt="ui-icon" className="w-20 h-20 py-4 bg-base-100 rounded-xl shadow-lg" />
                                    <h2 className="card-title py-4">User Interface (UI) Development</h2>
                                    <p className='text-justify'>
                                        I'm passionate about creating amazing and functional user experiences. With skills in transforming graphic designs into code that can be run in a browser. With my expertise, I bring technical ability and creativity to create engaging and effective UI solutions, ensuring the application or website has a positive impact on the user experience.
                                    </p>

                                </div>
                            </div>



                        </div>
                    </div>
                </section>

                {/* section Favtools */}
                <section className='favtools flex flex-col sm:flex-row mb-10'>
                    <div className="flex flex-col gap-16 w-full">
                        <div className='title'>
                            <h3 className='text-base font-semibold mb-4'>Skills</h3>
                            <h1 className='text-5xl font-bold'>Favorite Tools</h1>
                        </div>

                        {/*  Card Favtools */}
                        <div className="grid grid-cols-3 gap-8 md:grid-cols-5 md:gap-10 ">
                            <img src={FigmaIcon} alt="figma-icon" className="w-full h-full aspect-square py-4 bg-base-100 rounded-xl shadow-lg xl:py-10 xl:rounded-3xl" />
                            <img src={GithubIcon} alt="github-icon" className="w-full h-full aspect-square py-4 bg-base-100 rounded-xl shadow-lg xl:py-10 xl:rounded-3xl" />
                            <img src={TailwindIcon} alt="tailwind-icon" className="w-full h-full aspect-square py-4 bg-base-100 rounded-xl shadow-lg xl:py-10 xl:rounded-3xl" />
                            <img src={ReactIcon} alt="react-icon" className="w-full h-full aspect-square py-4 bg-base-100 rounded-xl shadow-lg xl:py-10 xl:rounded-3xl" />
                            <img src={VSIcon} alt="vs-icon" className="w-full h-full aspect-square py-4 bg-base-100 rounded-xl shadow-lg xl:py-10 xl:rounded-3xl" />
                        </div>

                    </div>
                </section>
            </div>
        </LayoutMain>
    )
}

export default Home