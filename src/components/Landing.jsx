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
    <div className = "landing-wrapper">
    <Link to="/login" style={{ textDecoration: 'none' }}><div className = "landing-btn"><p>Log In</p></div></Link>
    
    <Link to="/register" style={{ textDecoration: 'none' }}> <div className="landing-btn reg"><p> Register</p></div>
    </Link>
    </div>
    <Footer/>
    </>
  )
}

export default Landing