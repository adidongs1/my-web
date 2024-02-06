import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            console.log('response', response)
            console.log(data)

            if (response.ok) {
                setUser(data)
                localStorage.setItem('token', data.data.token)
                toast.success('Login Berhasil!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate('/admin/dashboard')
                return
            } else {
                // alert(data.errors.message)
                toast.error(String(data.errors.message),
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

            }
        }
        catch (error) {
            console.log(error)
        }


    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

