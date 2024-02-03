import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminApi from "../services/AdminApi";

function LoginAdmin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await AdminApi(username, password)
            console.log('data', data)
            setIsAuth(true)
            navigate.push('/dashboard')
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="w-1/3">
                <h1 className="text-3xl font-bold mb-5">Login Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginAdmin