import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
        <div className = "navBar">
          <nav>
                <Link className="navLink" to="/ads">
                  Home
                </Link>
                <Link className="navLink" to="/settings">
                  Settings
                </Link>
                <Link className="navLink" to="/saved">
                  Deals
                </Link>
          </nav>
        </div>
  )
}

export default Navbar