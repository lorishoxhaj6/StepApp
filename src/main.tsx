import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Steps from './cards/Steps'
import Analytics from './cards/Analytics'
import TrainingCards from "./cards/TrainingCards"
import Contacts from "./cards/Contacts"
import Dashboard from './cards/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <div className='flex h-screen'>
        {/*Sidebar sempre visibile*/}
      <Navbar/>
         {/*Contenuto cambia in base alla rotta*/}
        <div className="flex-1 overflow-y-auto bg-gray-100 transition-all duration-300 ease-in-out">
          <Routes>
            <Route path="/" element={<Steps/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/training-cards" element={<TrainingCards/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/contact-us" element={<Contacts/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  </StrictMode>,
)
