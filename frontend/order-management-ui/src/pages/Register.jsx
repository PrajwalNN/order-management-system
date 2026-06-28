import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'CUSTOMER'
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        try {
            const res = await register(form)
            const { token, name, email, role } = res.data.data
            localStorage.setItem('token', token)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            localStorage.setItem('role', role)
            setSuccess('Registration successful! Redirecting...')
            setTimeout(() => navigate('/'), 1000)
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow" style={{ width: '100%', maxWidth: '440px' }}>
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-1 fw-bold">🛒 OrderSys</h3>
                    <p className="text-center text-muted mb-4">Create your account</p>

                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    {success && <div className="alert alert-success py-2">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Min 6 characters"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                name="role"
                                className="form-select"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm me-2" />
                            )}
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    <hr />
                    <p className="text-center mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="text-decoration-none">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register