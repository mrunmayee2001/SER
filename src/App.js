import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import CallLogs from './Components/CallLogs';
import LiveCall from './Components/LiveCall';
import Maps from './Components/Map';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='main-container'>
        <Sidebar/>
        <div className='main-page'>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard/>}></Route>
              <Route path="/LiveCall" element={<LiveCall/>} ></Route>
              <Route path="/CallLogs"element={<CallLogs/>} ></Route>
              <Route path="/Maps"element={<Maps/>} ></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
