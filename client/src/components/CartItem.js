import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
      <div>
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        <span style={{ margin: '0 15px' }}>{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </div>
      <p><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
      <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;