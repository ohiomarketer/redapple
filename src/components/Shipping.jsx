import React, { useEffect } from 'react'
import { Summary } from './Summary'
import { useNavigate } from 'react-router-dom'
import { useShopContext } from '../context/shopContext';
import { NoProducts } from './NoProducts';

export const Shipping = () => {
    const navigate = useNavigate();

    const { cartItems } = useShopContext();

    const handleActive = (e) => {
        const items = document.querySelectorAll('.shipping-list li')
        items.forEach(item => item.classList.remove('active'))
        e.currentTarget.classList.add('active')
    }

    useEffect(() => {
        const items = document.querySelectorAll('.shipping-list li')
        items.forEach(item => {
            item.addEventListener('click', handleActive)
        })
        return removeEvent(items)
    }
    , [])

    const removeEvent = (items) => {

        return () => {
            items.forEach(item => {
                item.removeEventListener('click', handleActive)
            })
        }
    }

  return (

    cartItems.length === 0 ? (
        <NoProducts text='tu carrito'/>
    ) : (
    <section className='shipping'>
        <div className="title">
            <h2> Metodo de Envio </h2>
        </div>
        <ul className="shipping-list">
            <li>
                <div className="text">
                    <p className="method">Retirar por Oficinas</p>
                    <p className="time">Tu producto listo en el dia</p>
                </div>
                <div className="price">
                    <p>Gratis</p>
                </div>
            </li>
            <li>
                <div className="text">
                    <p className="method">Envio a Domicilio</p>
                    <p className="time">Recibilo en 48 horas</p>
                </div>
                <div className="price">
                    <p>$1000</p>
                </div>
            </li>
            <li>
                <div className="text">
                    <p className="method">Envio Prioritario</p>
                    <p className="time">Envio flex en un maximo 24 horas</p>
                </div>
                <div className="price">
                    <p>$2500</p>
                </div>
            </li>
        </ul>

        <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/payment')}>
                <span>Continuar</span>
                <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </button>

            <button className="btn btn-secondary back" onClick={() => navigate('/cart')}>
                <span>Volver</span>
                <ion-icon name="arrow-back-outline" aria-hidden="true"></ion-icon>
            </button>
        </div>
        <Summary />
    </section>
  ))
}
