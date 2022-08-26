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
import Moment from "react-moment";
import moment from "moment";
import ReportLogo from '../Assets/report.png';
import ClosedLogo from '../Assets/closed.png';
import OpenLogo from '../Assets/open.png';

function CallLogs() {
  const [Logs, setCallLogs] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const ref = collection(db, "Call-Logs");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setCallLogs(info);
    }
    fetchInfo();
  }, []);
  var FinalEmotion="";
  

  return (
    <div className="Call-Logs">
      <div className="Log-Area">
      <div className="Nav-Bar">
        <div></div>
        <div>Date and Time</div>
        <div>City</div>
        <div>Number</div>
        <div>Duration</div>
        <div>Emotion</div>
        <div>Report</div>
      </div>
      <ul className="Logs-List">
        {Logs.map((val) => {
          if(val.EndDateTime){
            if(val.Emotion.Drunk>val.Emotion.Abusive && val.Emotion.Drunk>val.Emotion.Painful && val.Emotion.Drunk>val.Emotion.Painful){
              FinalEmotion = 'Drunk';
            }
            else if(val.Emotion.Abusive>val.Emotion.Drunk && val.Emotion.Abusive>val.Emotion.Painful && val.Emotion.Abusive>val.Emotion.Painful){
              FinalEmotion = 'Abusive';
            }
            else if(val.Emotion.Painful>val.Emotion.Abusive && val.Emotion.Painful>val.Emotion.Drunk && val.Emotion.Painful>val.Emotion.Drunk){
              FinalEmotion = 'Painful';
            }
            else{
              FinalEmotion= 'Stressful';
            }
          }
          return (
            <li className="Log">
              <div >{val.EndDateTime? (val.Status=='Closed'? <img src={ClosedLogo} className="Log-Status"></img>: <img src={OpenLogo} className="Log-Status"></img>): null}
              </div>
              <div className="DateTime">{val.StartDateTime.toDate().toDateString()}  {val.StartDateTime.toDate().toLocaleTimeString("en-US")}</div>
              <div className="City">{val.City}</div>
              <div className="val-Name">{val.PhoneNo}</div>
              <div className="Call-Status">
                {val.EndDateTime? moment.utc(moment(val.EndDateTime.toDate()).diff(val.StartDateTime.toDate(), "second") * 1000).format("HH:mm:ss"): 'On Call'}
              </div>
              <div className="Emotion">
                {FinalEmotion}
              </div>
              <div>
                <a href={val.Transcripts}>
                  <img src={ReportLogo} alt="Photo"  className='ReportLogo'/>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default CallLogs;