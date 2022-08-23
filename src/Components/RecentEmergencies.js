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
                      <div className="Logo" style={{border:"3px solid #F7FC04", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#F7FC04', size: '6vh'}}>
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
                      <div className="Logo" style={{border:"3px solid #FF0202", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#FF0202', size: '6vh'}}>
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
                      <div className="Logo" style={{border:"3px solid #FF7A00", padding:"1vh"}}>
                      <IconContext.Provider value={{ color: '#FF7A00', size: '6vh'}}>
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