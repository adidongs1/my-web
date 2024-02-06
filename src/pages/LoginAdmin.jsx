import { useState } from "react";
import useAuth from "../services/UseAuth";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Logo from '../assets/img/just-logo.png'
import decorRight from '../assets/img/decor-topRight.svg'
import decorLeft from '../assets/img/decor-bottomLeft.svg'

import FillButton from "../components/FillButton";

function LoginAdmin() {
    const [input, setInput] = useState({
        username: '',
        password: ''
    });

    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.username !== '' && input.password !== '') {
            login(input.username, input.password)
            return

        } else {
            toast.error('Username and Password tidak boleh kosong!',
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
        <section className="min-h-screen flex justify-center">

            <div className="card w-[36rem] bg-blue-charcoal-950 m-auto py-20 px-12 rounded-[6rem]">
                <form onSubmit={handleSubmit} >
                    <section className="card-body items-center text-center flex gap-6">
                        <h2 className="card-title">
                            <img src={Logo} alt="A" className='min-h-32' />
                        </h2>

                        <div className="form-control w-full">
                            <label htmlFor="user-username" className='text-lg font-bold text-start text-white line tracking-wider'>Username</label>
                            <input
                                type="username"
                                id="user-username"
                                name="username"
                                placeholder="Enter Username"
                                aria-describedby="user-username"
                                aria-invalid="false"
                                onChange={handleInput}
                                className='min-h-12 rounded-lg px-4 py-2 w-full'
                            />
                            <div id="user-username" className="sr-only">
                                Please enter a valid username. It must contain at least 6 characters.
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="password" className='text-lg font-bold text-start text-white line tracking-wider'>Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                                onChange={handleInput}
                                autoComplete='off'
                                className='min-h-12 rounded-lg px-4 py-2 w-full'
                            />
                            <div id="user-password" className="sr-only">
                                your password should be more than 6 character
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