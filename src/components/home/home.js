import React from 'react'
import Header from './header'
import {Route,Routes } from 'react-router-dom';
import Register from '../auth/register';
import Slider from '../slider/slider';
import OTPVerification from '../auth/otp';
import AllExecutive from '../executive/allexecutive';
import ClientsAll from '../admin/allclents';
import UserSearch from '../admin/userSearch';
import MarkAttendance from '../admin/markattendce';
import Attendencedownload from '../admin/attendencedownload';
import Login from '../auth/login';
import Clientdownload from '../admin/downloadClient';

const Home = () => {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <Header/>
      </div>
    </div>
    <div className="col-lg-12">
        <Routes>
        <Route path='/' element={<Slider/>}></Route>

            <Route path='/register' element={<Register/>}></Route>
            <Route path='/otp-verification' element={<OTPVerification/>}></Route>
            <Route path='/All-executive' element={<AllExecutive/>}></Route>
            <Route path='/all-client' element={<ClientsAll/>}></Route>
            <Route path='/user-seacrch' element={<UserSearch/>}></Route>
            <Route path='/mark-attendce' element={<MarkAttendance/>}></Route>
            <Route path='/attendceDownload' element={<Attendencedownload/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path ="/download-client" element={<Clientdownload/>}></Route>

            
        </Routes>
      </div>
  </div>
  

  )
}

export default Home