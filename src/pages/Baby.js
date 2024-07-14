import React from 'react';
import Navbar from "../components/Lnav";
import { useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import Animation from './animation.json'
import { Link } from 'react-router-dom';

export default function Baby() {
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [babyname,setBabyname] = useState('');
    const [babygender,setBabygender] = useState('');
    const [babydob,setBabydob] = useState('');
    const [hospital,setHospital] = useState('');

    const addDetails = (e) =>{
        e.preventDefault();
        if(!babyname || !babydob || !babygender || !hospital){
            alert("Please fill all details");
            return;
        }
        Axios.put(`https://vaccine-server-tj0x.onrender.com/baby`,{
            babyname:babyname,
            babydob:babydob,
            babygender:babygender,
            hospital:hospital
        })
        .then(() => {
            console.log("Success");
            setModalIsOpen(true);
          })
          .catch(() => {
            console.error();
          });
    }

  return (
    <div className='out'>
      <Navbar />
      <div class="border-b border-gray-900/10 p-5 flex justify-center items-center">
        <form>
            <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Baby name</label>
                <div class="mt-2">
                <input type="text" onChange={(e)=>{setBabyname(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-3">
                <label>Gender</label>
                <select className='collapse collapse-arrow  input-error font-normal mb-5' onChange={(e) => setBabygender(e.target.value)} required>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                </select>
            </div>
            <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
                <div class="mt-2">
                <input type="date" onChange={(e)=>{setBabydob(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Hopital name where baby born</label>
                <div class="mt-2">
                <input type="text" onChange={(e)=>{setHospital(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
            <button className='btn bg-red-500 font-bold text-xl text-white hover:bg-red-400 hover:text-black' type='submit' onClick={addDetails}>Submit</button>
            </div>

        </form>
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
            <Link to='/login'>
                <button onClick={closeModal} className='close bg-red-500 w-16 h-16 -translate-y-56 text-white rounded-full font-black'>
                    X
                </button>
            </Link>
            </Modal>

            </div>
    </div>
  )
}
