import React from 'react'
import Navbar from "../components/Dnav"
import { Link } from 'react-router-dom'

export default function Dir() {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center translate-y-40'>
            <div className='bg-zinc-500 h-96 w-1/2 flex justify-center gap-72 p-40 rounded-2xl'>
                <Link to="/login"><button className="btn bg-amber-500 hover:bg-amber-300 border-0 text-3xl">User</button></Link>
                <Link to="/alogin"><button className="btn bg-amber-500 hover:bg-amber-300 border-0 text-3xl">Admin</button></Link>
            </div>
        </div>
    </div>
  )
}