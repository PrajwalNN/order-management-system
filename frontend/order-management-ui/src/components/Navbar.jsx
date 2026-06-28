import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const name = localStorage.getItem('name')
    const role = localStorage.getItem('role')

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    🛒 OrderSys
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>

                        {role === 'ADMIN' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products/add">
                                        Add Product
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders/history">
                                        View Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {role === 'CUSTOMER' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders/place">
                                        Place Order
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders/history">
                                        My Orders
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>

                    <div className="d-flex align-items-center">
                        <span className="text-light me-3">
                            👤 {name} ({role})
                        </span>

                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar