import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1>My Orders</h1>

      {error && <div className="error">{error}</div>}

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>You haven't placed any orders yet</p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          {orders.map(order => (
            <div 
              key={order._id} 
              style={{
                backgroundColor: 'white',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <h3>Order ID: {order._id}</h3>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9900' }}>
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <span style={{
                    padding: '5px 15px',
                    borderRadius: '4px',
                    backgroundColor: order.isPaid ? '#d4edda' : '#fff3cd',
                    color: order.isPaid ? '#155724' : '#856404'
                  }}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>

              <div>
                <strong>Shipping Address:</strong>
                <p>{order.shippingAddress}</p>
              </div>

              <div style={{ marginTop: '15px' }}>
                <strong>Items:</strong>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px',
                    padding: '10px 0',
                    borderBottom: index < order.orderItems.length - 1 ? '1px solid #eee' : 'none'
                  }}>
                    <img 
                      src={item.image || 'https://via.placeholder.com/60'} 
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <p><strong>{item.name}</strong></p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
