
import { NavLink } from 'react-router-dom'

import Logo from '../assets/img/logo.png'
import IconBlogs from '../assets/icons/carbon_blog.svg'
import IconPortfolio from '../assets/icons/portofolio-icons.svg'

function Sidebar() {
    return (
        <div className="drawer-side z-40">

            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

            <aside className='bg-base-200 min-h-screen w-80'>
                <div className='bg-base-200 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex '>
                    <a href="/dashboard">
                        <img src={Logo} alt="Logo" className='h-10' />
                    </a>
                </div>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <details id='disclosure-blogs'>
                            <summary className='group'>
                                <span>
                                    <img src={IconBlogs} alt="Blogs" />
                                </span>
                                Blogs
                            </summary>
                            <ul>
                                <li>
                                    <NavLink to="/dashboard">Blog Posts</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blog-categories">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/new-post">Add New Post</NavLink>
                                </li>

                            </ul>
                        </details>
                    </li>

                    <li className='hidden'>
                        <details id='disclosure-portfolio'>
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