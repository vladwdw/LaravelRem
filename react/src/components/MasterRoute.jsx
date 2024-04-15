import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';// Настройте путь импорта соответственно
import AllUsers from '../pages/AllUsers';
import { useState } from 'react';
function MasterRoute() {
    const [authed, setAuthed] = useState(localStorage.getItem('auth'));
   
    return (
       authed && localStorage.getItem('position') === 'мастер-ремонтник' || localStorage.getItem('position') === 'директор'? (
         <Outlet />
       ) : (
         <Navigate to="/" />
       )
    );
   }

export default MasterRoute;