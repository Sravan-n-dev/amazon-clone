import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={product.image || 'https://via.placeholder.com/250'} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p>{product.description?.substring(0, 60)}...</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default ProductCard;