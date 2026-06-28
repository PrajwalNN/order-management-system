import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../services/dashboardService'

const StatCard = ({ title, value, icon, color, linkTo, linkLabel }) => (
    <div className="col-md-3 col-sm-6 mb-3">
        <div className={`card border-0 shadow-sm h-100`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>{title}</p>
                        <h2 className={`fw-bold text-${color} mb-0`}>{value}</h2>
                    </div>
                    <span style={{ fontSize: '2rem' }}>{icon}</span>
                </div>
                {linkTo && (
                    <Link to={linkTo} className="btn btn-sm btn-outline-secondary mt-3 w-100">
                        {linkLabel}
                    </Link>
                )}
            </div>
        </div>
    </div>
)

const Dashboard = () => {
    const name = localStorage.getItem('name')
    const role = localStorage.getItem('role')

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        cancelledOrders: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getDashboard()
            .then(res => setStats(res.data.data))
            .catch(() => setError('Failed to load dashboard data.'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            {/* Welcome Banner */}
            <div className="p-4 mb-4 bg-dark text-white rounded-3">
                <h4 className="fw-bold mb-1">👋 Welcome back, {name}!</h4>
                <p className="mb-0 text-white-50">
                    Role: <strong>{role}</strong> &nbsp;|&nbsp; Here's your system overview
                </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-dark" />
                </div>
            ) : (
                <div className="row">
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        icon="📦"
                        color="primary"
                        linkTo="/products"
                        linkLabel="View Products"
                    />
                    <StatCard
                        title="Total Orders"
                        value={stats.totalOrders}
                        icon="🛒"
                        color="success"
                        linkTo="/orders/history"
                        linkLabel="View Orders"
                    />
                    <StatCard
                        title="Pending Orders"
                        value={stats.pendingOrders}
                        icon="⏳"
                        color="warning"
                        linkTo="/orders/history"
                        linkLabel="Check Pending"
                    />
                    <StatCard
                        title="Cancelled Orders"
                        value={stats.cancelledOrders}
                        icon="❌"
                        color="danger"
                        linkTo="/orders/history"
                        linkLabel="View Cancelled"
                    />
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-4">
                <h5 className="fw-bold mb-3">⚡ Quick Actions</h5>

                <div className="d-flex flex-wrap gap-2">

                    {role === 'ADMIN' && (
                        <>
                            <Link to="/products/add" className="btn btn-dark">
                                ➕ Add Product
                            </Link>

                            <Link to="/products" className="btn btn-outline-secondary">
                                📦 Manage Products
                            </Link>

                            <Link to="/orders/history" className="btn btn-outline-secondary">
                                📋 View All Orders
                            </Link>
                        </>
                    )}

                    {role === 'CUSTOMER' && (
                        <>
                            <Link to="/orders/place" className="btn btn-outline-dark">
                                🛍️ Place Order
                            </Link>

                            <Link to="/orders/history" className="btn btn-outline-secondary">
                                📋 My Orders
                            </Link>

                            <Link to="/products" className="btn btn-outline-secondary">
                                📦 Browse Products
                            </Link>
                        </>
                    )}

                </div>
            </div>

            {/* OOP Info Banner */}
            <div className="mt-4 p-3 border rounded bg-light">
                <h6 className="fw-bold mb-2">🎓 OOP Concepts Demonstrated</h6>
                <div className="row row-cols-2 row-cols-md-4 g-2">
                    {[
                        { label: 'Encapsulation', desc: 'Private fields + getters/setters' },
                        { label: 'Inheritance', desc: 'Admin & Customer extend AbstractUser' },
                        { label: 'Abstraction', desc: 'AbstractOrder, AbstractUser' },
                        { label: 'Polymorphism', desc: 'StandardOrder vs DiscountedOrder' },
                        { label: 'Interface', desc: 'DiscountStrategy → FestivalDiscount' },
                        { label: 'Exception Handling', desc: 'ProductNotFoundException etc.' },
                        { label: 'Collections', desc: 'List<> & Set<> throughout services' },
                        { label: 'Layered Arch.', desc: 'Controller → Service → Repository' },
                    ].map((item, i) => (
                        <div key={i} className="col">
                            <div className="p-2 bg-white border rounded text-center h-100">
                                <div className="fw-semibold" style={{ fontSize: '0.8rem' }}>
                                    {item.label}
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard