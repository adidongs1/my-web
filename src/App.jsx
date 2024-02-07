import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//pages
import Maintenance from './pages/Maintenance'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'
import SinglePost from './pages/SinglePost'
import LoginAdmin from './pages/LoginAdmin'
import Dashboard from './pages/Dashboard'
import NewPost from './pages/NewPost'

//services
import AuthProvider from './services/AuthProvider'
import PrivateRoute from './services/PrivateRoute'
import BlogProvider from './services/BlogProvider'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <BlogProvider>
            <Routes>
              {/* admin */}
              <Route path="/admin" element={<LoginAdmin />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/new-post" element={<NewPost />} />
              </Route>


              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Maintenance />} />
              <Route path="/portfolio" element={<Maintenance />} />
              <Route path="/contacts" element={<Maintenance />} />

              {/* path blogging */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/single-post/:id" element={<SinglePost />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BlogProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App