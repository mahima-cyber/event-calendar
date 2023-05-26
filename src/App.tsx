import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './Routes/calendar';
// import Sidebar from './component/Layout/sidebar';
import Layout from './component/Layout';
import ClippedDrawer from './component/Layout';
import { Routes, Route } from "react-router-dom";
import ClientList from './Routes/clientList';
import UserEventlist from './Routes/userEventlist';

function App() {
  return (
    // <div className="App">
     <div className="container">
      <ClippedDrawer>
      <div className="calendar-container">

      <Routes>
      
        <Route path="/" Component={Calendar}/>
        <Route path="/client" Component={ClientList} />
        <Route path ='/client-events' Component={UserEventlist}/>
    </Routes>
      </div>
      </ClippedDrawer>
      {/* <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="calendar-container">
        <Calendar />
      </div> */}
    </div>
    // </div>
  );
}

export default App;
