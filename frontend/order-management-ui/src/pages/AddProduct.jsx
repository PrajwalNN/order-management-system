import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../services/productService'

const AddProduct = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
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
            await addProduct({
                ...form,
                price: parseFloat(form.price),
                stock: parseInt(form.stock)
            })
            setSuccess('Product added successfully!')
            setTimeout(() => navigate('/products'), 1200)
        } catch (err) {
            const data = err.response?.data
            if (data?.data && typeof data.data === 'object') {
                const msgs = Object.values(data.data).join(', ')
                setError(msgs)
            } else {
                setError(data?.message || 'Failed to add product.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h4 className="fw-bold mb-4">➕ Add New Product</h4>

                        {error && <div className="alert alert-danger py-2">{error}</div>}
                        {success && <div className="alert alert-success py-2">{success}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows={3}
                                    placeholder="Enter description (optional)"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="e.g. 299.99"
                                    min="0.01"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    placeholder="e.g. 100"
                                    min="0"
                                    value={form.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-dark"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm me-2" />
                                    )}
                                    {loading ? 'Adding...' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/products')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct