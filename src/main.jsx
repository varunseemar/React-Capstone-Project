import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Info from './pages/Info.jsx'
import Browse from './pages/Browse.jsx'
import MovieSelection from './pages/MovieSelection.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/MovieSelection" element={<MovieSelection />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  </React.StrictMode>,
)
