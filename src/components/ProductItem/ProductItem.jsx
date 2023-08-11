import React, { useState } from 'react';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const [showNewProductInfo, setShowNewProductInfo] = useState(true);

  const {
    description,
    entity_id,
    manufacturer,
    name,
    new_product,
    price,
    promotion,
    promotion_discount,
    stock,
    tax,
  } = product;

  const onNewProductClickHandler = (e) => {
    setShowNewProductInfo(false);
  };

  const stockProductClassName = stock > 0 ? "active" : "";

  const calculateBruttoPrice = (nettoPrice, promotion_, promotion_discount_) => {
    let bruttoPrice = nettoPrice;

    if (promotion_) {
      bruttoPrice = nettoPrice / (1 - (promotion_discount_ / 100));
    }

    bruttoPrice = bruttoPrice * (1 + (tax / 100));

    return bruttoPrice.toFixed(2);
  };

  return (
    <div className='productItem' key={entity_id}>
      {(new_product === 1 && showNewProductInfo) && <h5 onClick={onNewProductClickHandler} className="productItem__newProduct">NEW</h5>}

      <h2 className="productItem__name">{name}</h2>

      <h5 className="productItem__manufacturer">{manufacturer}</h5>

      <h4 className="productItem__description">{description}</h4>

      <h5 className={`productItem__stock ${stockProductClassName}`}>{stock > 0 ? "Available" : "Unavailable"}</h5>

      {(promotion && <h5 className="productItem__promotion">{promotion}</h5>)}

      <h5 className="productItem__price">{price}netto / {calculateBruttoPrice(price, promotion, promotion_discount)}brutto</h5>
    </div>
  );
};

export default ProductItem;
