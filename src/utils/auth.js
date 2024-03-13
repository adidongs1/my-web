import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AuthProvider() {
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
                    text: `Selamat Datang ${username}!`,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#17b472'

                })
                navigate('/onepiece/dashboard')
                return

            } else {
                const errMessage = data.message ? data.message : 'Terjadi Kesalahan'

                console.log(data.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `Username dan Password! </br></br> ${errMessage}  `,

                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#17b472'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate('/onepiece')
    }

    return { user, login, logout }
}