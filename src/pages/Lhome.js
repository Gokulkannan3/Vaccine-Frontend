import React from 'react';
import Navbar from "../components/Hnav";
import coffee from "../images/cov.png";
import pasta from "../images/cv.png"
import Bg from "../images/b.jpg";
import { Link } from 'react-router-dom';

export default function Lhome() {
  return (
    <div className='out'>
      <Navbar />
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img alt='img' src={coffee} className="w-full h-1/2" />
          <div className="absolute flex justify-between left-5 right-5 translate-y-52">
            <a href="#slide2" className="btn btn-circle">❮</a> 
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div> 
        <div id="slide2" className="carousel-item relative w-full">
          <img alt='img' src={pasta} className="w-full h-1/2" />
          <div className="absolute flex justify-between transform translate-y-52 left-5 right-5">
            <a href="#slide1" className="btn btn-circle">❮</a> 
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div> 
      </div>
      <Link to='/book'>
        <div className='flex justify-center cursor-pointer'>
            <div className='flex justify-center rounded-3xl border-2 border-black w-64 -translate-y-64'>
                <img className='rounded-3xl' alt='img' src={Bg}/>
            </div>
        </div>
      </Link>
      <Link to='/book'>
        <div className='flex justify-center -translate-y-56'>
            <button className='btn bg-red-400 text-xl'>Book your Slot</button>
        </div>
      </Link>
    </div>
  );
}
