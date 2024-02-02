import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Maintenance from './pages/Maintenance'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Maintenance />} />
          <Route path="/portfolio" element={<Maintenance />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacts" element={<Maintenance />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App