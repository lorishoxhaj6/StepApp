import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Analytics from './cards/Analytics'
import TrainingCards from "./cards/TrainingCards"
import Contacts from "./cards/Contacts"
import Dashboard from './cards/Dashboard'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router"
import { AnimatePresence } from 'framer-motion'
import AnimatedPage from './components/AnimatedPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="/training-cards" element={<AnimatedPage><TrainingCards /></AnimatedPage>} />
        <Route path="/analytics" element={<AnimatedPage><Analytics /></AnimatedPage>} />
        <Route path="/contact-us" element={<AnimatedPage><Contacts /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <div className='flex h-screen'>
      <Navbar />
        <div className="flex-1 overflow-y-auto bg-[#F5F5F7] transition-all duration-300 ease-in-out">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  </StrictMode>
)
