import { NavLink } from 'react-router-dom'
import useAuth from '../services/UseAuth'

import Logo from '../assets/img/logo.png'
import IconHome from '../assets/icons/icon-home.svg'
import Sidebar from './Sidebar'

function LayoutAdmin({ children }) {

    const { logout } = useAuth()
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    {/* navbar */}
                    <div className='bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]'>
                        <nav className='navbar w-full'>
                            <div className="flex flex-1 md:gap-1 lg:gap-2">
                                <span className='tooltip tooltip-bottom'>
                                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
                                        <a>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                        </a>
                                    </label>
                                </span>
                                <div className="flex items-center gap-2 lg:hidden">
                                    <a href="/dashboard">
                                        <img src={Logo} alt="Logo0" className='h-10' />
                                    </a>

                                </div>

                            </div>

                            <div className="flex-0">
                                <NavLink to="/blog" className="flex gap-6">
                                    <div className="flex gap-1 px-4 items-center">
                                        <img src={IconHome} alt="sites" />
                                        <p className='font-normal text-sm text-black text-nowrap hover:text-prim-jade-500'> Open Sites</p>
                                    </div>
                                </NavLink>
                            </div>

                            <div className="flex-0">
                                <div>
                                    <button onClick={() => logout()} className='flex items-center border-2 border-transparent py-2 px-4 bg-sec-pomegranate-500 rounded-lg text-white font-semibold hover:bg-slate-400 hover:border-slate-400 hover:text-base-200'>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {/* Children */}
                    {children}

                </div>
                <Sidebar />
            </div>
        </>
    )
}

export default LayoutAdmin