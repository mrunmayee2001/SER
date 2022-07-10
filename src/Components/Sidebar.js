import React from 'react';
import '../App.css';
import DashboardLogo from '../Assets/dashboard.png';
import CallLogo from '../Assets/telephone-call.png';
import CallLogsLogo from '../Assets/call-log.png';
import MapsLogo from '../Assets/map.png';

const Sidebardata = [
    {
        title: "Dashboard",
        icon: <img src={DashboardLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/"
    },
    {
        title: "CallLogs",
        icon: <img src={CallLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/LiveCall"
    },
    {
        title: "Live Call",
        icon: <img src={CallLogsLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/CallLogs"
    },
    {
        title: "Maps",
        icon: <img src={MapsLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/Maps"
    }
]

function Sidebar() {
  return (
    <div className='Sidebar'>
        <ul className='sidebar-list'>
        {Sidebardata.map((val, key)=> {
            return (
                <li key={key} 
                    className='row'
                    id={window.location.pathname === val.link ? "active" : ""}
                    onClick={()=>{window.location.pathname=val.link}}
                    >
                    <div>{val.icon}</div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default Sidebar