import React, { useEffect, useState } from 'react'
import { getMyOrders, cancelOrder } from '../services/orderService'

const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({ text: '', type: '' })

    const fetchOrders = async () => {
        try {
            const res = await getMyOrders()
            setOrders(res.data.data)
        } catch {
            setMessage({ text: 'Failed to load orders.', type: 'danger' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this order?')) return
        try {
            await cancelOrder(id)
            setMessage({ text: 'Order cancelled successfully.', type: 'success' })
            fetchOrders()
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Cancellation failed.',
                type: 'danger'
            })
        }
    }

    const statusBadge = (status) => {
        const map = {
            PENDING: 'bg-warning text-dark',
            CANCELLED: 'bg-danger',
            DELIVERED: 'bg-success'
        }
        return map[status] || 'bg-secondary'
    }

    return (
        <div>
            <h4 className="fw-bold mb-4">📋 My Order History</h4>

            {message.text && (
                <div className={`alert alert-${message.type} py-2`}>{message.text}</div>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-dark" />
                </div>
            ) : orders.length === 0 ? (
                <div className="alert alert-info">No orders found. Place your first order!</div>
            ) : (
                orders.map(order => (
                    <div className="card mb-3 shadow-sm" key={order.id}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Order #{order.id}</strong>
                                <span className="text-muted ms-2" style={{ fontSize: '0.85rem' }}>
                  {new Date(order.createdAt).toLocaleString()}
                </span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                <span className={`badge ${statusBadge(order.status)}`}>
                  {order.status}
                </span>
                                {order.status === 'PENDING' && (
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleCancel(order.id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-sm table-bordered mb-2">
                                <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Unit Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>₹{parseFloat(item.unitPrice).toFixed(2)}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{parseFloat(item.subtotal).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="text-end fw-bold">
                                Total: ₹{parseFloat(order.totalAmount).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default OrderHistory