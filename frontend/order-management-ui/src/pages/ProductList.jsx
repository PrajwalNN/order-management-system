import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../services/productService'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({ text: '', type: '' })

    const role = localStorage.getItem('role')

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts()
            setProducts(res.data.data)
        } catch {
            setMessage({ text: 'Failed to load products.', type: 'danger' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return

        try {
            await deleteProduct(id)
            setMessage({
                text: 'Product deleted successfully.',
                type: 'success'
            })
            fetchProducts()
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Delete failed.',
                type: 'danger'
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">📦 Products</h4>

                {role === 'ADMIN' && (
                    <Link to="/products/add" className="btn btn-dark btn-sm">
                        + Add Product
                    </Link>
                )}
            </div>

            {message.text && (
                <div className={`alert alert-${message.type} py-2`}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-dark" />
                </div>
            ) : products.length === 0 ? (
                <div className="alert alert-info">
                    No products found.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>Stock</th>

                            {role === 'ADMIN' && (
                                <th>Action</th>
                            )}
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.description || '—'}</td>
                                <td>₹{parseFloat(product.price).toFixed(2)}</td>

                                <td>
                                    <span
                                        className={`badge ${
                                            product.stock > 0
                                                ? 'bg-success'
                                                : 'bg-danger'
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>

                                {role === 'ADMIN' && (
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ProductList