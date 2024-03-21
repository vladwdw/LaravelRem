import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';// Настройте путь импорта соответственно
import AllUsers from '../pages/AllUsers';
import { useState } from 'react';
function ProtectedRoute() {

const [authed,setAuthed]=useState(localStorage.getItem('auth')); //Пример использования ху
 return authed ? (
   <Outlet></Outlet>
 ) : (
    <Navigate to="/login" />
 );
}

export default ProtectedRoute;