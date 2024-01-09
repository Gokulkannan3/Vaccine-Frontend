import React, { useState, useEffect } from 'react';
import Navbar from '../components/Hnav';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import Animation from './animation.json'

const BookingForm = () => {
  const [userData, setUserData] = useState(null);
  const [usermail, setUsermail] = useState('');
  const [slot, setSlot] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [count, setCount] = useState('');
  const [city, setCity] = useState('');
  const [firstname,setUserFirstname] = useState('')
  const [lastname,setUserLastname] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCity = searchParams.get('city');
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setUsermail(JSON.parse(storedUserData).email);
      setUserFirstname(JSON.parse(storedUserData).firstname);
      setUserLastname(JSON.parse(storedUserData).lastname);
      setCity(selectedCity);
    } else {
      axios
        .get('http://localhost:8080/isAuth', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.result && response.data.result.length > 0) {
            const userData = response.data.result[0];
            setUserData(userData);
            setUsermail(userData.email);
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            console.error('No user details found in the response');
          }
        })
        .catch((error) => {
          console.error('An unexpected error occurred:', error.message);
        });
    }
  }, []);

  const bookSlot = () => {
    axios.post('http://localhost:8080/book', {
      usermail,
      slot,
      aadhar,
      count,
      city,
      firstname,
      lastname,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        alert(response.data.message);
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <Navbar />
      <div className='flex justify-center p-20'>
      <div className='bg-amber-300 w-3/6 flex justify-center rounded-3xl p-32'>
        <form className='text-xl font-bold'>
            <label htmlFor="usermail">User Email :  </label>
            <input
            type="email"
            className='input input-bordered input-error font-normal mb-5'
            value={usermail}
            disabled
            />
            <br />
            <label htmlFor="usermail">User First Name :  </label>
            <input
            type="text"
            className='input input-bordered input-error font-normal mb-5'
            value={firstname}
            disabled
            />
            <br />
            <label htmlFor="usermail">User Last Name :  </label>
            <input
            type="text"
            className='input input-bordered input-error font-normal mb-5'
            value={lastname}
            disabled
            />
            <br />
            <label>Slot :  </label>
            <select className='collapse collapse-arrow  input-error font-normal mb-5' onChange={(e) => setSlot(e.target.value)} required>
              <option>Select</option>
              <option>slotone</option>
              <option>slottwo</option>
              <option>slotthree</option>
            </select>
            <br />

            <label htmlFor="aadhar">Aadhar :  </label>
            <input
            type='number' 
            className='input input-bordered input-error font-normal mb-5'
            onChange={(e)=>setAadhar(e.target.value)}
            maxLength={13}
            />
            <br />

            <label htmlFor="count">Count :  </label>
            <input
            type="number"
            className='input input-bordered input-error font-normal mb-5'
            onChange={(e) => setCount(e.target.value)}
            required
            />
            <br />

            <label htmlFor="city">City :  </label>
            <input
            type="text"
            className='input input-bordered input-error font-normal'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled
            />
            <br />
            <div className='flex justify-center'>
              <button className='btn btn-success mt-5 text-xl' type="button" onClick={bookSlot}>
                Book Slot ☺
              </button>
            </div>
        </form>
      </div>
      </div>
      <div className='flex justify-center items-center'>
            <Modal
            isOpen={modalIsOpen}
            contentLabel="Registration Success Modal"
            ariaHideApp={false}
            className='flex justify-center items-center content-center h-screen w-screen fixed top-0 left-0'
            overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75'
            >
            <div className='flex justify-center items-center content-center h-96 w-96 bg-white p-4 rounded-md'>
                <Lottie
                animationData={Animation}
                loop={false}
                autoplay={true}
                className="lot"
                style={{ width: 400, height: 400, flex:1,justifyContent:'center', alignItems:'center'}}
                />
                
            </div>
                <button onClick={closeModal} className='close bg-red-500 w-16 h-16 -translate-y-56 text-white rounded-full font-black'>
                    X
                </button>
            </Modal>

            </div>
    </div>
  );
};

export default BookingForm;
