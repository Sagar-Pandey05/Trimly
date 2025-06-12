import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../component/ProtectedRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Dashboard from '../pages/user/Dashboard'
import BookAppointment from '../pages/user/BookAppointment';
import Profile from '../pages/user/Profile';
import Appointment from '../pages/user/Appointment';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/user' element={
                        <ProtectedRoute role="user">
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/user/book" element={
                        <ProtectedRoute role="user">
                            <BookAppointment />
                        </ProtectedRoute>
                    } />
                    <Route path="/user/appointments" element={
                        <ProtectedRoute role="user">
                            <Appointment />
                        </ProtectedRoute>
                    } />
                    <Route path="/user/profile" element={
                        <ProtectedRoute role="user">
                            <Profile />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppRoutes