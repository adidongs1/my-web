import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setUser({ token })
        }
    }, [])

    const login = async (username, password) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/jwt-auth/v1/token`, config)
            const data = await response.json()

            if (response.ok) {
                console.log(data)
                setUser(data)
                localStorage.setItem('token', data.token)

                // Alert Berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil!',
                    text: 'Selamat Datang!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#17b472'

                })
                navigate('/onepiece/dashboard')
                return

            } else {
                const errMessage = data.message ? data.message : 'Terjadi Kesalahan'

                console.log(data.message)
                // alert(data.errors.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: errMessage,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#17b472'

                })

            }
        }
        catch (error) {
            console.log(error)
        }


    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        Swal.fire({
            icon: 'success',
            title: 'Logout Berhasil!',
            text: 'Anda Berhasil Logout!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor: '#17b472'

        })
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

