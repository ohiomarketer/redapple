import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/shopContext";
import { toast } from "react-toastify";

export const Summary = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  
  const { getTotalPrice, cartItems, removeFromCart } = useShopContext();

  useEffect(() => {
    setProducts(cartItems);
    setPrice(getTotalPrice());
  }, [getTotalPrice]);

  return (
    <>
      <div className="order-summary">
        <div className="product">
          {
            products.map((product, index) => (
              <div key={index} className="product-item">
                <div className="image-container">
                  <img src={product.thumbnails} alt="" />
                  <span className="quantity">1</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-category">{product.category}</p>
                </div>
                <div className="product-price">
                  <i className="bx bx-trash" style={{ cursor: 'pointer' }}
                    onClick={() => {
                      removeFromCart(product.id)
                      toast.error(`${product.title} eliminada del carrito`)
                    }
                    } />
                  <p className="price">${product.price}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="total">
        <h3>Total</h3>
        <p>${price}</p>
      </div>
    </>
  );
}

