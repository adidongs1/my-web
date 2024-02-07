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
        // fetch https://api-fe-batch5.neuversity.id/api/admin/login
        // method POST

        try {
            const response = await fetch('https://api-fe-batch5.neuversity.id/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (response.ok) {
                console.log(data)

                setUser(data)
                localStorage.setItem('token', data.data.token)

                // Alert Berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil!',
                    text: 'Selamat Datang' + ' ' + data.data.username + '!',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#17b472'

                })
                navigate('/admin/dashboard')
                return

            } else {
                const ErrorMessage = data.errors.message ? "Username dan Password Salah!" : 'Something went wrong'
                // alert(data.errors.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ErrorMessage,
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

