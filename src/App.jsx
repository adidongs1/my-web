import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Maintenance from './pages/Maintenance'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'
import SinglePost from './pages/SinglePost'
import LoginAdmin from './components/LoginAdmin'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/admin" element={<LoginAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Maintenance />} />
            <Route path="/portfolio" element={<Maintenance />} />
            <Route path="/contacts" element={<Maintenance />} />

            {/* path blogging */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/single-post/:id" element={<SinglePost />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

        </AuthProvider>
      </Router>
    </>
  )
}

export default App