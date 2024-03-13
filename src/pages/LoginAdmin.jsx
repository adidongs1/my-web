import { useState } from "react";
import Swal from 'sweetalert2'

import AuthProvider from "../utils/auth"


import Logo from '../assets/img/just-logo.png'
import decorRight from '../assets/img/decor-topRight.svg'
import decorLeft from '../assets/img/decor-bottomLeft.svg'

import FillButton from "../components/basics/FillButton";

function LoginAdmin() {
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false)

    const { login } = AuthProvider()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.username !== '' && input.password !== '') {
            login(input.username, input.password)
            return

        } else {
            //jika pass dan usernam kosong
            Swal.fire({
                icon: 'error',
                title: 'Maaf!',
                text: 'Silahkan isi username dan password!',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#17b472'

            })
        }

    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <section className="flex min-h-[100dvh]">

            <div className="card xl:w-[36rem] bg-blue-charcoal-950 m-auto xl:py-20 xl:px-12 py-5 px-5 xl:rounded-[6rem] rounded-[4rem] justify-center">
                <form onSubmit={handleSubmit} >
                    <section className="card-body items-center text-center flex xl:gap-6">
                        <h2 className="card-title">
                            <img src={Logo} alt="A" className='xl:min-h-32 h-16' />
                        </h2>

                        <div className="form-control w-full">
                            <label htmlFor="user-username" className='xl:text-lg text-base font-bold text-start text-white line tracking-wider'>Username</label>
                            <input
                                type="username"
                                id="user-username"
                                name="username"
                                placeholder="Enter Username"
                                aria-describedby="user-username"
                                aria-invalid="false"
                                onChange={handleInput}
                                className='xl:min-h-12  rounded-lg px-4 py-2 w-full'
                            />
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="password" className='xl:text-lg text-base font-bold text-start text-white line tracking-wider'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                                onChange={handleInput}
                                autoComplete='off'
                                className='xl:min-h-12  rounded-lg px-4 py-2 w-full'
                            />
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white text-sm font-semibold mt-2">Show Password</button>
                            </div>

                        </div>


                        <label className="card-actions  w-full justify-end">
                            <FillButton textBtn="Login" />
                        </label>
                    </section>
                </form>
            </div>



            {/* decor */}
            <img src={decorRight} alt="" className='fixed top-0 right-0 -z-10' />
            <img src={decorLeft} alt="" className='fixed bottom-0 left-0 -z-10' />
        </section>
    )
}

export default LoginAdmin