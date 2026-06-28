import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/authService'

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await login(form)
            const { token, name, email, role } = res.data.data
            localStorage.setItem('token', token)
            localStorage.setItem('name', name)
            localStorage.setItem('email', email)
            localStorage.setItem('role', role)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow" style={{ width: '100%', maxWidth: '420px' }}>
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-1 fw-bold">🛒 OrderSys</h3>
                    <p className="text-center text-muted mb-4">Sign in to your account</p>

                    {error && (
                        <div className="alert alert-danger py-2">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" />
                            ) : null}
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>

                    <hr />
                    <p className="text-center mb-0">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-decoration-none">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login