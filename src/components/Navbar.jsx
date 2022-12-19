import React from 'react'
import Banner from './Banner'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
        <div className = "navBar">
          <nav>
                <Link className="navLink" to="/home">
                  Home
                </Link>
                <Link className="navLink" to="/ads">
                  Ads
                </Link>
                <Link className="navLink" to="/saved">
                  Saved
                </Link>
                <Link className="navLink" to="/users">
                  Users
                </Link>
                <Link className="navLink" to="/settings">
                  Settings
                </Link>

          </nav>
        </div>
        </>
  )
}

export default Navbar