
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to="/admin" />
    return <Outlet />

}

export default PrivateRoute

