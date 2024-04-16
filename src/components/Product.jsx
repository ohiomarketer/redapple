import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useShopContext } from '../context/shopContext';
import { db } from '../main';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const Product = () => {
    const [product, setProduct] = useState(null); // Cambiamos el estado inicial a null
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartItems } = useShopContext(); 

    const handleAddToCart = (id) => {
        addToCart(id); // Pasamos solo el ID del producto
    };

    const handleBuyNow = (product) => {
      // Check if the product is already in the cart
      const existingProduct = cartItems.find((item) => item.id === id);
      if (existingProduct) {
        toast.error(`¡Ya tienes este producto en el carrito!`, {
          position: "bottom-center",
        });
        navigate("/cart");
      } else {
        addToCart(product);
        navigate("/cart");
      }
    };
    
    useEffect(() => {
        const getProduct = async () => {
            try {
                const docRef = doc(db, 'phones', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({data: docSnap.data(), id: docSnap.id});
                } else {
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };
        getProduct();
    }, [id]);

    if (loading) return ""; // Mensaje de carga mientras se obtiene el producto

    if (!product) return <h1>Product not found</h1>; // Mensaje si el producto no se encuentra

    return (
        <div className='product__section'>
            <Link style={{
                color: '#1d001271',
                textDecoration: 'underline',
                marginBottom: '10px',
            }} to='/'>
                &lt;&lt; Seguir Comprando
            </Link>
            <div className='product__image'>
              {
                product.data.thumbnails.map((image, index) => (
                  <img key={index} src={image} alt={product.data.title} />
                ))
              }
            </div>

            <div className="info__container">
                <h2 className='product__title'>{product.data.title}</h2> 
                <p className='product__price'>${product.data.price} ARS</p>
                <button className='product__add' onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
                <button className='product__button' onClick={() => handleBuyNow(product.id)}>Comprar Ahora</button>
            </div>

            <div className="description__container">
                <p className="description">
                    {product.data.description}
                </p>
            </div>
        </div>
    );
};
