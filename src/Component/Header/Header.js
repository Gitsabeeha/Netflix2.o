import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Netflix from'./Netflix.svg'

const Header = () => {
  return (
    <div className='header'>
     <nav className='navbar'>
        <Link to='/'><img className='logo'src={Netflix} width={150} alt="NETFLIX" /></Link>
        <div className="btn-lan">
        <select className=" form-select form-select-sm" aria-label="Small select example">
           <option  value="2">English</option>
           <option value="1">Hindi</option>
       </select>
       <Link to='/login'>
        <button type="button" className="mybtn btn btn-danger btn-sm">Sign In</button></Link>
        </div>
     </nav>
   
    </div>
  )
}

export default Header
