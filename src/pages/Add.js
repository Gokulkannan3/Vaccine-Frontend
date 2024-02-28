import React,{useState} from 'react'
import Navbar from "../components/Anav"
import Axios from 'axios';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import Animation from './animation.json'
import { Link } from 'react-router-dom';

export default function Add() {
    const [city,setCity]=useState('');
    const [hname,setHname]=useState('');
    const [ddate, setDdate] = useState('');
    const [contact, setContact] = useState('');
    const [slots, setSlots] = useState('');
    const [count, setCount] = useState('');
    const [ost, setOst] = useState('');
    const [oet, setOet] = useState('');
    const [sst, setSst] = useState('');
    const [sset, setSset] = useState('');
    const [tst, setTst] = useState('');
    const [tet, setTet] = useState('');
    const [slotone, setSlotone] = useState('');
    const [slottwo, setSlottwo] = useState('');
    const [slotthree, setSlotthree] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const add = (e) => {
      e.preventDefault();
      const currentDate = new Date();
      const selectedDate = new Date(ddate);
      if (selectedDate <= currentDate) {
        alert('Date cannot be in the present or past');
        return;
      }
      Axios.post(`https://vaccine-server-tj0x.onrender.com/add`, {
        city: city,
        hname: hname,
        contact: contact,
        ddate: ddate,
        slots: slots,
        count : count,
        ost : ost,
        oet : oet,
        sst : sst,
        sset : sset,
        tst : tst,
        tet : tet,
        slotone : slotone,
        slottwo : slottwo,
        slotthree : slotthree,
      })
        .then(() => {
          console.log("Success");
          setModalIsOpen(true);
        })
        .catch(() => {
          console.error();
        });
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    return (
      <div>
        <Navbar/>
        <div class="border-b border-gray-900/10 p-5 flex justify-center items-center">
        <form>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-24">
                <div class="sm:col-span-12">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                  <div class="mt-2">
                  <input type="text" onChange={(e)=>{setCity(e.target.value);}} name="first-name" id="first-name" maxLength={20} autocomplete="given-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
                </div>
  
              <div class="sm:col-span-12">
                  <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Hospital name</label>
                  <div class="mt-2">
                  <input type="text" onChange={(e)=>{setHname(e.target.value);}} name="last-name" id="last-name" autocomplete="family-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
  
              <div class="sm:col-span-6">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Contact Number</label>
                  <div class="mt-2">
                  <input type="phone" onChange={(e)=>{setContact(e.target.value);}} autocomplete="email" maxLength={30} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
  
              <div class="sm:col-span-6">
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
                  <div class="mt-2">
                  <input id="date" name="date" type="date" onChange={(e)=>{setDdate(e.target.value);}} class="input input-bordered block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
  
              <div class="sm:col-span-6">
                  <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Slots</label>
                  <div class="mt-2">
                  <input type="number" onChange={(e)=>{setSlots(e.target.value);}} maxLength={200} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
  
              <div class="sm:col-span-6">
                  <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Doseage Stock</label>
                  <div class="mt-2">
                      <input type="number" onChange={(e)=>{setCount(e.target.value);}} maxLength={200}  class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
  
              <div class="sm:col-span-6">
                  <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Slot 1 Start Time</label>
                  <div class="mt-2">
                    <input type="time" onChange={(e)=>{setOst(e.target.value);}} name="first-name" id="first-name" class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                  </div>
              </div>
              <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 1 end time</label>
                <div class="mt-2">
                  <input type="time" onChange={(e) => setOet(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 2 start time</label>
                <div class="mt-2">
                  <input type="time" onChange={(e) => setSst(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 2 end time</label>
                <div class="mt-2">
                  <input type="time" onChange={(e) => setSset(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 3 start time</label>
                <div class="mt-2">
                  <input type="time" onChange={(e) => setTst(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot3 end time</label>
                <div class="mt-2">
                  <input type="time" onChange={(e) => setTet(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 1 Count</label>
                <div class="mt-2">
                  <input type="number" onChange={(e) => setSlotone(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-6">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 2 Count</label>
                <div class="mt-2">
                  <input type="number" onChange={(e) => setSlottwo(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div class="sm:col-span-12">
                <label class="block text-sm font-medium leading-6 text-gray-900">Slot 3 Count</label>
                <div class="mt-2">
                  <input type="number" onChange={(e) => setSlotthree(e.target.value)} class="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            </div>
            <div className='flex justify-center mt-5'>
                <button className='btn bg-red-500 font-bold text-xl text-white hover:bg-red-400 hover:text-black' type='submit' onClick={add}>Submit</button>
            </div>
        </form>
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
              <Link to='/admin'>
                  <button onClick={closeModal} className='close bg-red-500 w-16 h-16 -translate-y-56 text-white rounded-full font-black'>
                      X
                  </button>
              </Link>
              </Modal>
  
              </div>
        </div>
    </div>
    )
  }
