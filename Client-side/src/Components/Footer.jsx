import React from 'react'
import {BsFacebook ,BsLinkedin , BsGithub , BsTwitter, BsWhatsapp} from 'react-icons/bs'
  function Footer() {

    const currentDate=new Date();
    const year=currentDate.getFullYear();
  return (
    <>
      <footer className=' right-0  left-0  h-[10vh] py-7 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-25'>

        <section className='text-lg'>
         Copyright  {year}  | All rights reserved
        </section>


  <section className='flex items-center justify-center gap-5 text-2xl text-white '>
    <a  className='hover:text-yellow-500 transition-all ease-in-out duration-300 '> 
    <BsFacebook/>
    </a>

    <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300 '> 
    <BsLinkedin/>
    </a>

    <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300 '> 
    <BsTwitter/>
    </a>

    <a href="" className='hover:text-green-500 transition-all ease-in-out duration-300 '> 
    <BsGithub/>
    </a>

    <a 
     href="https://wa.me/918318004156" 
     target="_blank" 
     rel="noopener noreferrer"
     className='hover:text-green-500 transition-all ease-in-out duration-300 '> 
    <BsWhatsapp/>
    </a>
  </section>
      </footer>
    </ >
  )
}

export default Footer

