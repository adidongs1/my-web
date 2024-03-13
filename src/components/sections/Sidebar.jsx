
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import IconBlogs from '../../assets/icons/carbon_blog.svg'
import IconPortfolio from '../../assets/icons/portofolio-icons.svg'
import IconMedia from '../../assets/icons/icon-media.svg'

function Sidebar() {
    return (
        <div className="drawer-side z-40">

            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

            <aside className='bg-base-200 min-h-[100dvh] w-80'>
                <div className='bg-base-200 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex '>
                    <NavLink to="/onepiece/dashboard">
                        <img src={Logo} alt="Logo" className='h-10' />
                    </NavLink>
                </div>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <details id='disclosure-blogs' open>
                            <summary className='group font-semibold'>
                                <span>
                                    <img src={IconBlogs} alt="Blogs" />
                                </span>
                                Blogs
                            </summary>
                            <ul>
                                <li>
                                    <NavLink to="/onepiece/dashboard">List Posts</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/onepiece/new-post" >Add New Post</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`${import.meta.env.VITE_BASE_URL}/wp-admin`} target='_blank' >Dashboard - WP</NavLink>
                                </li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <details id='disclosure-media' className=''>
                            <summary className='group font-semibold'>
                                <span>
                                    <img src={IconMedia} alt="Media" />
                                </span>
                                Media
                            </summary>
                            <ul>
                                <li>
                                    <NavLink to="/onepiece/media">
                                        Media Library
                                    </NavLink>
                                </li>


                            </ul>
                        </details>
                    </li>

                    <li>
                        <details id='disclosure-portfolio' className='pointer-events-none opacity-25' >
                            <summary className='group'>
                                <span>
                                    <img src={IconPortfolio} alt="Portfolio" />
                                </span>
                                Portofolio
                            </summary>
                            <ul>
                                <li>
                                    <a>Projects</a>
                                </li>


                            </ul>
                        </details>
                    </li>
                </ul>

            </aside>


        </div>
    )
}

export default Sidebar