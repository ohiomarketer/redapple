import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="footer">

    <div className="footer-top section">
      <div className="container">

        <div className="footer-brand">
          <ul className="social-list" style={{
            display: 'flex',
            justifyContent: 'space-evenly',

          }}>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>

            <li>
              <a href="https://instagram.com/iphonetemple/" target='_blank' className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

          </ul>

        </div>

        <div className="footer-link-box">

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Contactanos</p>
            </li>

            <li>
              <address className="footer-link">
                <ion-icon name="location"></ion-icon>

                <span className="footer-link-text">
                  Oficinas en San Pedro - Consultar por Nuestras Redes Sociales
                </span>
              </address>
            </li>

            <li>
              <a href="mailto:iphonetemple39@gmail.com" className="footer-link">
                <ion-icon name="mail"></ion-icon>

                <span className="footer-link-text">phonesmarketer@gmail.com</span>
              </a>
            </li>

          </ul>

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Mi Informacion</p>
            </li>

            <li>
              <Link to='/cart' className="footer-link">
                <ion-icon name="chevron-forward-outline"></ion-icon>

                <span className="footer-link-text">Ver Carrito</span>
              </Link>
            </li>

            <li>
              <Link to="/products" className="footer-link">
                <ion-icon name="chevron-forward-outline"></ion-icon>

                <span className="footer-link-text">Comprar</span>
              </Link>
            </li>

            <li>
              <a href="#products" className="footer-link">
                <ion-icon name="chevron-forward-outline"></ion-icon>

                <span className="footer-link-text">Nuevos productos</span>
              </a>
            </li>

          </ul>

          <div className="footer-list">

            <p className="footer-list-title">Nuestros Horarios</p>

            <table className="footer-table">
              <tbody>

                <tr className="table-row">
                  <th className="table-head" scope="row">Lun - Mar:</th>

                  <td className="table-data">8AM - 10PM</td>
                </tr>

                <tr className="table-row">
                  <th className="table-head" scope="row">Mie:</th>

                  <td className="table-data">8AM - 7PM</td>
                </tr>

                <tr className="table-row">
                  <th className="table-head" scope="row">Vie:</th>

                  <td className="table-data">7AM - 12PM</td>
                </tr>

                <tr className="table-row">
                  <th className="table-head" scope="row">Sab:</th>

                  <td className="table-data">9AM - 8PM</td>
                </tr>

                <tr className="table-row">
                  <th className="table-head" scope="row">Dom:</th>

                  <td className="table-data">Cerrado</td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  </footer>

  )
}
