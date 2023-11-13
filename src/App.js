import React from 'react';
import './App.css';
import './output.css'
import './index.css';
import NeoFeed from './components/neofeed';
import Header from './components/header';
import NextLaunches from './components/nextlaunches';
import Home from './components/home';
import Astropod from './components/astropod';
import Solar from './components/solar';
import Agencies from './components/agencies'
import Stations from './components/stations';
import Patches from './components/patches';
import AgencyDetail from './components/agencydetail';
import PlanetDetails from './components/planetdetails';
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/neofeed" element={<NeoFeed />} />
        <Route path="/nextlaunches" element={<NextLaunches />} />
        <Route path="/photo" element={<Astropod />} />
        <Route path="/planets" element={<Solar />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/stations" element={<Stations />} />     
        <Route path="/patches" element={<Patches />} />  
        <Route path="/agency/:id" element={<AgencyDetail />} />   
        <Route path="/planet/:id" element={<PlanetDetails />} />   
      </Routes>
    </Router>
);
}


export default App;
