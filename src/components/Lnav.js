import React from 'react'
import Logo from "../images/tnemblem.jpg"
import "../App.css"
import { Link } from 'react-router-dom'

export default function Lnav() {
  return (
    <nav className='bg-sky-500 h-32'>
        <div className='flex justify-start'>
            <img alt='logo' src={Logo} className='w-20 rounded-full ml-8 mt-5'/>
        </div>
        <div className='flex justify-center -mt-14 font-bold text-4xl'>
            <p>Quick Vax</p>
        </div>
        <div className='flex justify-end -translate-x-8 -mt-12 gap-4'>
            <Link to="/"><button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold'>Home</button></Link>
            <Link to="/signup"><button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold'>Signup</button></Link>
        </div>
    </nav>
  )
}
