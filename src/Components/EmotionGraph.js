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


function EmotionGraph() {
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

  var data = {
    labels: ["Midnight", "Early Morning", "Noon", "Afternoon", "Evening", "Late Evening","Night"],
    datasets: [
      {
        label: "Drunk",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(224, 212, 253, 0.1)",
        borderColor: "rgb(224, 212, 253)"
      },
      {
        label: "Abusive",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(194,175,240, 0.1)",
        borderColor: "rgb(194,175,240)"
      },
      {
        label: "Painful",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(176,130,199, 0.1)",
        borderColor: "rgb(176,130,199)"
      },
      {
        label: "Stressful",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(173,0,255, 0.1)",
        borderColor: "rgb(173,0,255)"
      }
    ]
  };
  const options= {
    scales: {
        y: {
            min: 0,
            max: 100
        }
    }
  };
  Logs.map((val) => {
    if(moment(val.DateTime.toDate()).diff(this, 'hours')>-24 && moment(val.DateTime.toDate()).format("HH")<=moment().format("HH")){
      var timeperiod = Math.round(moment(val.DateTime.toDate()).format("HH")/4);
      if(val.Emotion == "Drunk") {
        data['datasets'][0]['data'][timeperiod]++;
      }
      else if(val.Emotion == "Abusive"){
        data['datasets'][1]['data'][timeperiod]++;
      }
      else if(val.Emotion == "Painful"){
        data['datasets'][2]['data'][timeperiod]++;
      }
      else if(val.Emotion == "Stressful"){
        data['datasets'][3]['data'][timeperiod]++;
      }
      console.log(timeperiod);
    }
  })

  console.log(data['datasets'][0]['data'][3]);
  return (
    <div className="EmotionGraph" >
      <Line data={data} height="120px" options={options}/>
    </div>
  )
}

export default EmotionGraph