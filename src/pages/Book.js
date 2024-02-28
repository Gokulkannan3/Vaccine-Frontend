import React, { useState, useEffect } from 'react';
import Navbar from '../components/Hnav';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Book() {
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vaccine-server-tj0x.onrender.com/fetchData');
        const data = response.data.data;
        const uniqueCities = [...new Set(data.map((item) => item.city))];

        setCityData(uniqueCities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get('https://vaccine-server-tj0x.onrender.com/fetchData', {
        params: {
          city: selectedCity,
          date: selectedDate,
        },
      });
      setDisplayedData(response.data.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDetails();
  };

  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className='flex justify-center bg-red-300 w-96 rounded-2xl mt-5'>
          <form className='mt-5' onSubmit={handleSubmit}>
            <label>
              City:
              <select className='collapse collapse-arrow input-error w-full max-w-xs' value={selectedCity} onChange={handleCityChange}>
                <option value='' disabled>
                  Select City
                </option>
                {cityData.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <div>
              <label>Date</label>
              <input className='input input-bordered input-error w-full max-w-xs' type='date' value={selectedDate} onChange={handleDateChange} />
            </div>
            <br />
            <div className='flex justify-center'>
                <button className='btn btn-primary mb-5' type='submit'>Fetch Details</button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className="card w-1/2 mt-10 h-auto mb-32 bg-blue-200 flex justify-center items-center shadow-3xl">
          {displayedData.length === 0 ? (
            <p className='text-xl font-bold'>No slots available</p>
          ) : (
            displayedData.map((item) => (
              <div key={item.id} className='text-xl'>
                <p className='text-red-500 font-extrabold flex justify-center mt-3 mb-3'>Hospital Name: {item.hname}</p>
                <div className='flex justify-center'>
                    <button className='btn btn-accent mb-5'>
                      Hospital Contact Number : {item.contact}
                    </button>
                </div>
                <div className='flex justify-center'>
                    <button className='btn btn-accent mb-5'>
                        Doseages count: {item.count}
                    </button>
                </div>
                <div className='flex justify-center'>
                    <button className='btn btn-accent mb-5'>
                        Slot 1 Timing: {item.ost}-{item.oet}   Count : {item.slotone}
                    </button>
                </div>
                <div className='flex justify-center'>
                    <button className='btn btn-accent mb-5'>
                        Slot 2 Timing: {item.sst}-{item.sset}  Count : {item.slottwo}
                    </button>
                </div>
                <div className='flex justify-center'>
                    <button className='btn btn-accent mb-5'>
                        Slot 3 Timing: {item.tst}-{item.tet}   Count : {item.slotthree}
                    </button>
                </div>
                <Link to={`/booking?city=${selectedCity}`}>
                  <div className='flex justify-center -translate-y-2'>
                    <button className='btn btn-outline btn-ascent'>Book Now</button>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
