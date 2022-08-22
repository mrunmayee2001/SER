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

  return (
    <div className="Call-Logs">
      <div className="Nav-Bar">
        {/* <div className="Searchbar">Search</div>
        <div className="Emotion-Filter">Emotion Filter</div>
        <div className="City-Filter">City Filter</div> */}
        <div>Date and Time</div>
        <div>City</div>
        <div>Name</div>
        <div>Duration</div>
        <div>Emotion</div>
        <div>Report</div>
      </div>
      <ul className="Logs-List">
        {Logs.map((val) => {
          return (
            <li className="Log">
              <div className="DateTime">{val.DateTime.toDate().toDateString()}  {val.DateTime.toDate().toLocaleTimeString("en-US")}</div>
              <div className="City">{val.City}</div>
              <div className="Person-Name">{val.Name}</div>
              <div className="Call-Status">{moment.utc(val.Duration * 1000).format("HH:mm:ss")}</div>
              <div className="Emotion">{val.Emotion}</div>
              <a href="https://www.google.co.in/">
                <img src={ReportLogo} alt="Photo"  className='ReportLogo'/>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CallLogs;