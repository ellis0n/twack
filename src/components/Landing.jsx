import React from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Footer from './Footer'


const Landing = () => {
  return (
    <>
    <Banner className="banner"/>
    <Link to="/login"><div className = "login-btn">Login</div></Link>
    <Link to="/register"> <div className="login-btn">Register</div></Link>
    <Footer/>
    </>
    )
}

export default Landing