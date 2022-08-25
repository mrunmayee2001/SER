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
import { ref, getDownloadURL, uploadBytes} from "firebase/storage";
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
        <div>Date and Time</div>
        <div>City</div>
        <div>Number</div>
        <div>Duration</div>
        <div>Emotion</div>
        <div>Report</div>
      </div>
      <ul className="Logs-List">
        {Logs.map((val) => {
          return (
            <li className="Log">
              <div className="DateTime">{val.StartDateTime.toDate().toDateString()}  {val.StartDateTime.toDate().toLocaleTimeString("en-US")}</div>
              <div className="City">{val.City}</div>
              <div className="Person-Name">{val.PhoneNo}</div>
              <div className="Call-Status">
                {moment.utc(moment(val.EndDateTime.toDate()).diff(val.StartDateTime.toDate(), "second") * 1000).format("HH:mm:ss")}
              </div>
              <div className="Emotion">
                {/* {val.Emotion} */}
              </div>
              <div>
                {/* {storage.child('images/stars.jpg').getDownloadURL().then((url) => {
                  <a href={val.Transcripts}>
                    <img src={ReportLogo} alt="Photo"  className='ReportLogo'/>
                  </a>
                })} */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CallLogs;