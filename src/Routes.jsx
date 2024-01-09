import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dir from "./pages/Dir"
import Alogin from "./pages/Alogin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Lhome from "./pages/Lhome";
import Add from "./pages/Add";
import Book from "./pages/Book";
import Booked from "./pages/Booked";

const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path ='/' element={<Home/>}/>
            <Route exact path ='/home' element={<Lhome/>}/>
            <Route exact path ='/login' element={<Login/>}/>
            <Route exact path ='/alogin' element={<Alogin/>}/>
            <Route exact path ='/dir' element={<Dir/>}/>
            <Route exact path ='/signup' element={<Signup/>}/>
            <Route exact path ='/pro' element={<Profile/>}/>
            <Route exact path ='/admin' element={<Admin/>}/>
            <Route exact path ='/add' element={<Add/>}/>
            <Route exact path ='/book' element={<Book/>}/>
            <Route exact path ='/booking' element={<Booked/>}/>
        </Routes>
        
    )   
}
export default AllRoutes