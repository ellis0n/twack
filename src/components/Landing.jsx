import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Banner from './Banner'
import Footer from './Footer'
import useAuth from '../hooks/useAuth' 
import { useNavigate } from 'react-router-dom'


const Landing = () => {
  const {auth} = useAuth()
  const navigate = useNavigate();


  useEffect(() => {
    if (auth.user){
      navigate('/home');
    }
    
  }, [auth])


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