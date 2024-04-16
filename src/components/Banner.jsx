import React from 'react'
import bannerbg from '../assets/static/banner.png'

export const Banner = () => {
  return (
    <section className='banner__section' style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.0)), url(${bannerbg})`
    }}>
        <div className='banner__content'>
            <h1 className='banner__title'>Ofertas Imperdibles</h1>
            <p className='banner__description'>Aprovecha las increibles ofertas que tenemos para vos desde el 10 de Abril hasta el 15 de Julio. Comprando por transferencia bancaria tenes un 15% de descuento adicional.</p>
            <a href="#products">
            <button className="banner__button">
                Ver ofertas
                <i className='bx bxs-chevrons-down'></i>
            </button>
            </a>
        </div>
    </section>
  )
}
