import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../main';


const CartContext = createContext();

export const useShopContext = () => useContext(CartContext);

export const ShopProvider = ({ children }) => {
    
    const initialCartItems = JSON.parse(localStorage.getItem('cartiphonetemple')) || [];
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(initialCartItems);

    
    useEffect(() => {
        localStorage.setItem('cartiphonetemple', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (productId) => {
        // Check if the product with the same ID already exists in the cart
        const existingProduct = cartItems.find(item => item.id === productId);
    
        if (existingProduct) {
            // If the product is already in the cart, show a message
            toast.error('¡El producto ya está en el carrito!', {
                position: 'bottom-center',
            });
        } else {
            // If the product is not in the cart, add it to the cart
            const productToAdd = products.find(product => product.id === productId);
            if (productToAdd) {
                setCartItems([...cartItems, productToAdd]);
                toast.success('Producto añadido al carrito', {
                    position: 'bottom-center',
                });
            } else {
                console.error('Product not found');
            }
        }

        console.log('Cart items:', cartItems);
    };
    
    
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        return total;
    };    
    
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'phones'));
                let data = [];
                querySnapshot.forEach((doc) => {
                    data = [...data, { id: doc.id, ...doc.data() }];
                });
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    });


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getTotalPrice,
                getTotalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
