import React, { useState, useEffect } from 'react';
import Logo from "../images/tnemblem.jpg";
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Hnav() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      axios.get("https://vaccine-server-tj0x.onrender.com/isAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      })
        .then((response) => {
          console.log(response.data);

          if (response.data.result && response.data.result.length > 0) {
            const userData = response.data.result[0];
            setUserData(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
          } else {
            console.error('No user details found in the response');
          }
        })
        .catch((error) => {
          console.error('An unexpected error occurred:', error.message);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate('/dir');
  };

  return (
    <nav className='bg-sky-500 h-32'>
      <div className='flex justify-start'>
        <img alt='logo' src={Logo} className='w-20 rounded-full ml-8 mt-5' />
      </div>
      <div className='flex justify-center font-bold text-4xl'>
          <p>Quick Vax</p>
      </div>
      <div className='flex justify-end -translate-x-8 -mt-12 gap-4'>
        {userData ? (
          <button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold' onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/dir">
            <button className='bg-red-400 hover:bg-green-400 text-2xl w-24 h-12 rounded-xl font-semibold'>
              Login
            </button>
          </Link>
        )}
        <Link to='/pro'>
            {userData && userData.firstname && (
              <div className="avatar online placeholder -mt-2">
                <div className="bg-red-400 text-neutral-content rounded-full w-16">
                  <span className="text-4xl font-bold flex justify-center text-black">{userData.firstname[0]}</span>
                </div>
              </div> 
            )}
        </Link>
      </div>
    </nav>
  );
}
