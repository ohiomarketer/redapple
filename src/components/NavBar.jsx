import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/static/logo.png'
import { useShopContext } from '../context/shopContext';

export const NavBar = () => {
    const [cartQuantity, setCartQuantity] = useState(0);

    const [menuActive, setMenuActive] = useState(false);
    const [navBarActive, setNavBarActive] = useState(false);

    const toggleMenu = ()=> setMenuActive(!menuActive);

    const { cartItems } = useShopContext();

    const navigate = useNavigate();

    const { } = useShopContext();

    useEffect(() => {
        setCartQuantity(cartItems.length);
    }, [cartItems, cartQuantity]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setNavBarActive(true);
            } else {
                setNavBarActive(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);


  return (
    <>
        <header className={!navBarActive ? "navbar" : "navbar active"}>
            <div className="logo__container" onClick={() => navigate('/')}>
                <img src={logo} alt="templeiphone logo" className="logo" />
            </div>

            <div className="actions__container">
                <div className="cartlogo__container">
                    <i className='bx bxs-shopping-bag' onClick={() => navigate('/cart')}></i>
                    {cartQuantity > 0 && <span className="cart__quantity">{cartQuantity}</span>}
                </div>
                <div className={!menuActive ? 'menu__toggler' : 'menu__toggler active'}
                onClick={toggleMenu}
                >
                    <div className="toggler"></div>
                    <div className="toggler"></div>
                    <div className="toggler"></div>
                </div>

                <nav className={!menuActive ? 'menu' : 'menu active'}>
                    <ul className="menu__list">
                        <li className="menu__item"
                        onClick={toggleMenu}>
                            <Link to='/' className="link">Inicio</Link>
                        </li>
                        <li className="menu__item"
                        onClick={toggleMenu}>
                            <Link to='/products' className="link">Productos</Link>
                        </li>
                        <li className="menu__item"
                        onClick={toggleMenu}>
                        <Link to='https://instagram.com/iphonetemple/' className="link">Nosotros</Link>
                        </li>
                        <li className="menu__item"
                        onClick={toggleMenu}>
                            <Link to='https://instagram.com/iphonetemple/' className="link">Instagram</Link>
                        </li>
                        <li className="menu__item"
                        onClick={toggleMenu}>
                            <Link to='/contact' className="link">Contacto</Link>
                        </li>

                    </ul>
                </nav>

                <div className="cartmenu">

                </div>
            </div>
        </header>
        <Separation />
    </>
  )
}

const Separation = () => {
    return <div className='separation' />
}