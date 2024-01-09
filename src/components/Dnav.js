import React from 'react'
import Logo from "../images/tnemblem.jpg"
import "../App.css"
import { Link } from 'react-router-dom'

export default function Dnav() {
  return (
    <nav className='bg-sky-500 h-32'>
        <div className='flex justify-start'>
            <img alt='logo' src={Logo} className='w-20 rounded-full ml-8 mt-5'/>
        </div>
        <div className='flex justify-center -mt-20 font-bold text-2xl'>
            <p>Government of TamilNadu</p>
        </div>
        <div className='flex justify-center -mt-1 font-bold text-2xl'>
            <p>Vaccination Booking</p>
        </div>
        <div className='flex justify-end -translate-x-8 -mt-12 gap-4'>
            <Link to="/"><button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold'>Home</button></Link>
            <button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold'>Signin</button>
        </div>
    </nav>
  )
}