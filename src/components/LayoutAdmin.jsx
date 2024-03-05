import { NavLink } from 'react-router-dom'
import useAuth from '../utils/UseAuth'

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
                                    <NavLink href="/admin/dashboard">
                                        <img src={Logo} alt="Logo" className='h-10' />
                                    </NavLink>

                                </div>

                            </div>

                            <div className="flex-0">
                                <NavLink to="/blog" target='_blank' className="flex gap-6 hover:text-prim-jade-500">
                                    <div className="flex gap-1 px-4 items-center">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.17395 3.16505C8.12742 3.12054 8.06552 3.0957 8.00113 3.0957C7.93675 3.0957 7.87485 3.12054 7.82832 3.16505L2.0752 8.66099C2.05076 8.68436 2.03132 8.71244 2.01806 8.74354C2.00479 8.77464 1.99797 8.80811 1.99801 8.84192L1.99707 14C1.99707 14.2653 2.10243 14.5196 2.28996 14.7072C2.4775 14.8947 2.73185 15 2.99707 15H6.0002C6.1328 15 6.25998 14.9474 6.35375 14.8536C6.44752 14.7598 6.5002 14.6327 6.5002 14.5V10.25C6.5002 10.1837 6.52653 10.1202 6.57342 10.0733C6.6203 10.0264 6.68389 10 6.7502 10H9.2502C9.3165 10 9.38009 10.0264 9.42697 10.0733C9.47386 10.1202 9.5002 10.1837 9.5002 10.25V14.5C9.5002 14.6327 9.55287 14.7598 9.64664 14.8536C9.74041 14.9474 9.86759 15 10.0002 15H13.0021C13.2673 15 13.5216 14.8947 13.7092 14.7072C13.8967 14.5196 14.0021 14.2653 14.0021 14V8.84192C14.0021 8.80811 13.9953 8.77464 13.982 8.74354C13.9688 8.71244 13.9493 8.68436 13.9249 8.66099L8.17395 3.16505Z" />
                                            <path d="M15.3409 7.62969L13.0034 5.39344V2C13.0034 1.86739 12.9508 1.74021 12.857 1.64645C12.7632 1.55268 12.6361 1.5 12.5034 1.5H11.0034C10.8708 1.5 10.7437 1.55268 10.6499 1.64645C10.5561 1.74021 10.5034 1.86739 10.5034 2V3L8.69345 1.26937C8.52407 1.09812 8.2722 1 8.00001 1C7.72876 1 7.47751 1.09813 7.30814 1.26969L0.661262 7.62906C0.466887 7.81656 0.442512 8.125 0.619387 8.32812C0.663803 8.3794 0.718187 8.42109 0.77923 8.45068C0.840273 8.48027 0.906698 8.49712 0.974462 8.50022C1.04223 8.50332 1.10991 8.4926 1.1734 8.46871C1.23689 8.44481 1.29485 8.40825 1.34376 8.36125L7.82814 2.165C7.87466 2.12049 7.93656 2.09565 8.00095 2.09565C8.06533 2.09565 8.12724 2.12049 8.17376 2.165L14.6588 8.36125C14.7543 8.45286 14.8822 8.50285 15.0146 8.50028C15.1469 8.4977 15.2728 8.44276 15.3647 8.3475C15.5566 8.14875 15.5406 7.82062 15.3409 7.62969Z" />
                                        </svg>
                                        <p className='font-normal text-sm text-nowrap'> Open in New Tab</p>
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