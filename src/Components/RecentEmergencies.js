import React, { useEffect, useState } from "react";
import db from "../Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {Row, Col} from 'react-bootstrap';
import { FaAmbulance,FaFire,FaUserSecret} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import Moment from "react-moment";
import moment from "moment";

function RecentEmergencies() {
  const [service, setService] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const ref = collection(db, "Call-Logs");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setService(info);
    }
    fetchInfo();
  }, []);

  return (
    <div className="Recent-Emergency">
      <ul className="Emergencies">
        {service.map((val) => {
          if(val.Service && val.Service=="Ambulance"){
            return (
              <div className="ServiceContainer" >
                      <div className="Logo" style={{border:"3px solid #1C4E80", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#1C4E80', size: '6vh'}}>
                        <div>
                          <FaAmbulance />
                        </div>
                      </IconContext.Provider>
                      </div>
                      <div className='ServiceDesc'>
                        <p>{val.PhoneNo}</p>
                        <p>{val.City} | {moment(val.StartDateTime.toDate()).fromNow()}</p>
                      </div>
                      
                  </div>
          )
          }
          else if(val.Service && val.Service=="Fire"){
            return (
              <div className="ServiceContainer">
                      <div className="Logo" style={{border:"3px solid #EA6A47", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#EA6A47', size: '6vh'}}>
                        <div>
                          <FaFire/>
                        </div>
                      </IconContext.Provider>
                      </div>
                      <div className='ServiceDesc'>
                      <p>{val.PhoneNo}</p>
                        <p>{val.City} | {moment(val.StartDateTime.toDate()).fromNow()}</p>
                      </div>
                      
                  </div>
          )
          }
          else if(val.Service && val.Service=="Police"){
              return (
              <div className="ServiceContainer">
                      <div className="Logo" style={{border:"3px solid #0091D5", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#0091D5', size: '6vh'}}>
                        <div>
                          <FaUserSecret/>
                        </div>
                      </IconContext.Provider>
                      </div>
                      <div className='ServiceDesc'>
                        <p>{val.PhoneNo}</p>
                        <p>{val.City} | {moment(val.StartDateTime.toDate()).fromNow()}</p>
                      </div>
                      
                  </div>
          )
          }
        })}
      </ul>
    </div>
  );
}

export default RecentEmergencies;