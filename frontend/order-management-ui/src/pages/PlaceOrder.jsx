import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../services/productService'
import { placeOrder } from '../services/orderService'

const PlaceOrder = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [festivalDiscount, setFestivalDiscount] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res.data.data))
            .catch(() => setError('Failed to load products.'))
    }, [])

    const handleQtyChange = (productId, qty) => {
        const quantity = parseInt(qty)
        if (quantity <= 0) {
            setSelectedItems(selectedItems.filter(i => i.productId !== productId))
            return
        }
        const existing = selectedItems.find(i => i.productId === productId)
        if (existing) {
            setSelectedItems(selectedItems.map(i =>
                i.productId === productId ? { ...i, quantity } : i
            ))
        } else {
            setSelectedItems([...selectedItems, { productId, quantity }])
        }
    }

    const getQty = (productId) => {
        const item = selectedItems.find(i => i.productId === productId)
        return item ? item.quantity : 0
    }

    const getTotal = () => {
        let total = selectedItems.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId)
            return sum + (product ? product.price * item.quantity : 0)
        }, 0)
        if (festivalDiscount) total = total * 0.9
        return total.toFixed(2)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if (selectedItems.length === 0) {
            setError('Please select at least one product.')
            return
        }
        setLoading(true)
        try {
            await placeOrder({
                items: selectedItems,
                applyFestivalDiscount: festivalDiscount
            })
            setSuccess('Order placed successfully!')
            setTimeout(() => navigate('/orders/history'), 1200)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h4 className="fw-bold mb-4">🛍️ Place New Order</h4>

            {error && <div className="alert alert-danger py-2">{error}</div>}
            {success && <div className="alert alert-success py-2">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="table-responsive mb-3">
                    <table className="table table-bordered align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>Product</th>
                            <th>Price (₹)</th>
                            <th>Available Stock</th>
                            <th>Quantity</th>
                            <th>Subtotal (₹)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>₹{parseFloat(product.price).toFixed(2)}</td>
                                <td>
                    <span className={`badge ${product.stock > 0
                        ? 'bg-success' : 'bg-danger'}`}>
                      {product.stock}
                    </span>
                                </td>
                                <td style={{ width: '120px' }}>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        min="0"
                                        max={product.stock}
                                        value={getQty(product.id)}
                                        onChange={e => handleQtyChange(product.id, e.target.value)}
                                        disabled={product.stock === 0}
                                    />
                                </td>
                                <td>
                                    ₹{(parseFloat(product.price) * getQty(product.id)).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="card p-3 mb-3 bg-light">
                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="festivalDiscount"
                            checked={festivalDiscount}
                            onChange={e => setFestivalDiscount(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="festivalDiscount">
                            🎉 Apply Festival Discount (10% off)
                        </label>
                    </div>
                    <h5 className="mb-0">
                        Estimated Total: <strong>₹{getTotal()}</strong>
                        {festivalDiscount && (
                            <span className="badge bg-warning text-dark ms-2">10% OFF</span>
                        )}
                    </h5>
                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={loading}
                >
                    {loading && (
                        <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    )
}

export default PlaceOrder