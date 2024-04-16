import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NoProducts = ({ text }) => {
    const navigate = useNavigate();
  return (
    <section className='no-products'>
        <h2>No hay productos</h2>
        <p>Aun no agregaste nada a { text }</p>
        <button onClick={() => navigate('/')}>
            Volver a la Tienda
        </button>
    </section>
  )
}
