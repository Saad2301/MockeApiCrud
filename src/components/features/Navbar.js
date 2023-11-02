import React from 'react'
import '../features/navbar.css'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
 
  return (
    <div className="topnav">
    <span className='active'>RTK</span>
    <span>create post</span>
    <span>get all posts</span>
    <input type="text" placeholder="Search.."/>
  </div>
  )
}

export default Navbar