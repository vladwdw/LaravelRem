import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import LoginPage from './pages/LoginPage';
import AllUsers from './pages/AllUsers';
import Cabinets from './pages/Cabinets';
import Inventories from './pages/Inventories';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/users" element= {<AllUsers></AllUsers>} />
        <Route path="/cabinets" element={<Cabinets></Cabinets>}/>
        <Route path="/inventories" element={<Inventories></Inventories>}/>
      </Routes>
      </Router>
  )
}

export default App
