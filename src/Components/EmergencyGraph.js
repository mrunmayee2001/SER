import React, { useEffect, useState } from 'react';
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
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function EmergencyGraph() {
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

  const data = {
    labels: ["Midnight", "Early Morning", "Noon", "Afternoon", "Evening", "Late Evening","Night"],
    datasets: [
      {
        label: "Police",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(255,122,0, 0.1)",
        borderColor: "rgb(255,122,0)"
      },
      {
        label: "Fire",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(255,2,2, 0.1)",
        borderColor: "rgb(255,2,2)"
      },
      {
        label: "Ambulance",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(247,252, 4, 0.1)",
        borderColor: "rgb(247,252, 4)"
      }
    ],
  }
  const options= {
    scales: {
        y: {
            min: 0,
            max: 100,
            // suggestedMax:100,
        }
    }
  };
  Logs.map((val) => {
    if(moment(val.StartDateTime.toDate()).diff(this, 'hours')>-24 && moment(val.StartDateTime.toDate()).format("HH")<=moment().format("HH")){
      var timeperiod = Math.round(moment(val.StartDateTime.toDate()).format("HH")/4);
      if(val.Service == "Police") {
        data['datasets'][0]['data'][timeperiod]++;
      }
      else if(val.Service == "Fire"){
        data['datasets'][1]['data'][timeperiod]++;
      }
      else if(val.Service == "Ambulance"){
        data['datasets'][2]['data'][timeperiod]++;
      }
    console.log(val.Name);
    }
  })

  return (
    <div className="EmergencyGraph" >
      <Line data={data} height="120px" options={options}/>
    </div>
  );
}

export default EmergencyGraph;