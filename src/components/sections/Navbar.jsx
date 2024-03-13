
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

function Navbar() {
    return (
        <>
            {/* navbar */}
            <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-none px-5 h-20">
                <div className="flex-1">
                    <NavLink to="/" className="btn btn-ghost">
                        <img src={Logo} alt="logo" className='h-8' />
                    </NavLink>
                </div>
                {/* desktop */}
                <div className="hidden sm:flex items-center sm:gap-3 md:gap-5 text-base font-semibold">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/portfolio">Portfolio</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink
                        to="/contacts"
                        className="border-2 border-transparent py-2 px-5 bg-sec-pomegranate-500 rounded-lg text-white font-semibold hover:bg-transparent hover:border-2 hover:border-sec-pomegranate-500 hover:text-sec-pomegranate-500"
                    >
                        Contact Me
                    </NavLink>
                </div>


                {/* mobile */}
                <div className="flex-none sm:hidden">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <div className="w-10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>

                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52 min-h-40 text-base font-semibold">

                            <li>
                                <NavLink to="/">Home</NavLink>

                            </li>
                            <li>
                                <NavLink to="/maintenance">About</NavLink>

                            </li>
                            <li>
                                <NavLink to="/maintenance">Portfolio</NavLink>

                            </li>
                            <li> <NavLink to="/blog">Blog</NavLink>
                            </li>
                            <li className="mt-auto">
                                <NavLink
                                    to="/maintenance"
                                    className="border-2 border-transparent py-2 px-5 bg-sec-pomegranate-500 rounded-lg text-white font-semibold hover:bg-transparent hover:border-2 hover:border-sec-pomegranate-500 hover:text-sec-pomegranate-500"
                                >
                                    Contact Me
                                </NavLink>
                            </li>





                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar