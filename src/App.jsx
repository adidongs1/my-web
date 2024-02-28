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
import EditPostForm from './pages/EditPostForm'
import DashboardMedia from './pages/DashboardMedia'


//services
import AuthProvider from './utils/AuthProvider'
import PrivateRoute from './utils/PrivateRoute'
import MediaProvider from './utils/MediaProvider'
import BlogProvider from './utils/BlogProvider'
import ScrollToTop from './utils/ScrollToTop'


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <BlogProvider>
            <MediaProvider>
              <Routes>
                {/* admin */}
                <Route path="/onepiece" element={<LoginAdmin />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/onepiece/dashboard" element={<Dashboard />} />
                  <Route path="/onepiece/new-post" element={<NewPost />} />
                  <Route path="/onepiece/edit-post/:id" element={<EditPostForm />} />
                  <Route path="/onepiece/media" element={<DashboardMedia />} />
                </Route>


                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Maintenance />} />
                <Route path="/portfolio" element={<Maintenance />} />
                <Route path="/contacts" element={<Maintenance />} />

                {/* path blogging */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/single-post/:id" element={<SinglePost />} />

                {/* <Route path="/test-feature" element={<TestFeature />} /> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MediaProvider>
          </BlogProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App