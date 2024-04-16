import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Home } from './Home'
import { Error } from './Error'
import { Products } from './Products'
import { Product } from './Product'
import { Upload } from './Upload'
import { Cart } from './Cart'
import { Shipping } from './Shipping'
import { Payment } from './Payment'
import { Contact } from './Contact'
import { Footer } from './Footer'

export const RoutesComponent = () => {
  return (
    <Router>
        <NavBar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<Product />} />
            <Route path='*' element={<Error />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
    </Router>
  )
}
