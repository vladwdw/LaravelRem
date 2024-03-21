import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function useAuth() {
 return useContext(AuthContext);
}

export function AuthProvider({ children }) {
 const [authed, setAuthed] = useState(false);

 const login = (token) => {
    localStorage.setItem('token', token);
    setAuthed(true);
    console.log('auth');
 };

 const logout = () => {
    localStorage.removeItem('token');
    setAuthed(false);
 };

 return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
 );
}