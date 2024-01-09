import React, { useState, useEffect } from 'react';
import Navbar from "../components/Hnav";
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
    } else {
        axios.get("http://localhost:8080/isAuth", {
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

  return (
    <div className='out'>
      <Navbar />
      <div>
        <div className='flex justify-center text-3xl font-bold mt-16'>
          <p>User Details</p>
        </div>
        <div className='flex justify-center'>
            {userData && (
                <div className='flex justify-center bg-red-400 w-3/6 h-96 items-center text-2xl mt-16'>
                    <div>
                        <p className='mb-2'>Name: {userData.firstname} {userData.lastname}</p>
                        <p className='mb-2'>Date of Birth: {userData.dob}</p>
                        <p className='mb-2'>Age: {userData.age}</p>
                        <p className='mb-2'>Email: {userData.email}</p>
                        <p className='mb-2'>Contact: {userData.contact}</p>
                        <p className='mb-2'>Address: {userData.address}</p>
                        <p className='mb-2'>Members in Family: {userData.mem}</p>
                    </div>
                </div>    
            )}
        </div>
      </div>
    </div>
  );
}
