import React from 'react'
import banner from './banner.jpg'
import './HomeBan.css'
const HomeBan = () => {
  return (
  <div className="banner">
       <img className='banner-image' src={banner} style={{width:'100%'}} alt="banner"/>
       <div className="overlay">
         <h1 className='text'>Unlimited movies, TV show and more</h1>
         <h4 className='text1'>Watch anywhere. Cancel anytime.</h4>
         <h5>Ready to watch? Enter your email to create or restart your membership.</h5>
         <div className="inputField">
         <input className='email'type="email"placeholder='email address' />
         <button type="button" className=" sbtn btn btn-danger ">Get Started</button>
        </div>
      </div>
   </div>
  )
}

export default HomeBan
