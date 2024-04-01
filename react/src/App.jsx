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
import ProtectedRoute from './components/ProtectedRoute';
import DirectorRoute from './components/DirectorRoute';
import Cabinet from './pages/Cabinet';
import Requests from './pages/Requests';
import RequestPage from './components/RequestTable/RequestPage';
import BuyOrderPage from './components/Orders/BuyOrderPage';
import OrderPage from './components/Orders/OrderPage';

function App() {
  const [count, setCount] = useState(0)
  const [authed,setAuthed]=useState(localStorage.getItem('auth')); 
  return (
    
    <Router>
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/request/:requestId" element={<RequestPage />} />
        <Route path="/order/:orderId" element={<OrderPage/>} />
        <Route path="/cabinets" element={<Cabinets></Cabinets>}/>
        <Route path="/buyOrder" element={<BuyOrderPage/>}></Route>
        <Route path="/cabinet" element={<Cabinet></Cabinet>}/>
        <Route path="/requests" element={<Requests></Requests>}/>
        <Route path="/inventories" element={<Inventories></Inventories>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<DirectorRoute></DirectorRoute>}>
            <Route path="/users" element={<AllUsers></AllUsers>}></Route>
          </Route>
        <Route path='/users'></Route>
        </Routes>
  
      </Router>  
  )
}

export default App
