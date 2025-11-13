import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ShopNexus</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cart">
          Cart
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;