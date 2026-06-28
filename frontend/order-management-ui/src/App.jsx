import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import PlaceOrder from './pages/PlaceOrder'
import OrderHistory from './pages/OrderHistory'
import MainLayout from './layouts/MainLayout'

// const PrivateRoute = ({ children }) => {
//     const token = localStorage.getItem('token')
//     return token ? children : <Navigate to="/login" />
// }

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) {
        return <Navigate to="/login" />
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />
    }

    return children
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <MainLayout><Dashboard /></MainLayout>
                    </PrivateRoute>
                } />
                {/* <Route path="/products" element={
                    <PrivateRoute>
                        <MainLayout><ProductList /></MainLayout>
                    </PrivateRoute>
                } /> */}
                <Route
                    path="/products"
                    element={
                        <PrivateRoute allowedRoles={['ADMIN', 'CUSTOMER']}>
                            <MainLayout><ProductList /></MainLayout>
                        </PrivateRoute>
                    }
                />
                {/* <Route path="/products/add" element={
                    <PrivateRoute>
                        <MainLayout><AddProduct /></MainLayout>
                    </PrivateRoute>
                } /> */}
                <Route
                    path="/products/add"
                    element={
                        <PrivateRoute allowedRoles={['ADMIN']}>
                            <MainLayout><AddProduct /></MainLayout>
                        </PrivateRoute>
                    }
                />
                {/* <Route path="/orders/place" element={
                    <PrivateRoute>
                        <MainLayout><PlaceOrder /></MainLayout>
                    </PrivateRoute>
                } /> */}
                <Route
                    path="/orders/place"
                    element={
                        <PrivateRoute allowedRoles={['CUSTOMER']}>
                            <MainLayout><PlaceOrder /></MainLayout>
                        </PrivateRoute>
                    }
                />
                {/* <Route path="/orders/history" element={
                    <PrivateRoute>
                        <MainLayout><OrderHistory /></MainLayout>
                    </PrivateRoute>
                } /> */}
                <Route
                    path="/orders/history"
                    element={
                        <PrivateRoute allowedRoles={['ADMIN', 'CUSTOMER']}>
                            <MainLayout><OrderHistory /></MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App