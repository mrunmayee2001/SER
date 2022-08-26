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

  var data = {
    labels: ["Midnight", "Early Morning", "Morning", "Afternoon", "Evening", "Late Evening","Night"],
    datasets: [
      {
        label: "Police",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(0, 145, 213, 0.1)",
        borderColor: "rgb(0, 145, 213)",
        lineTension: 0.5,
      },
      {
        label: "Fire",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(234, 106, 71, 0.1)",
        borderColor: "rgb(234, 106, 71)",
        lineTension: 0.5,
      },
      {
        label: "Ambulance",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(28, 78, 128, 0.1)",
        borderColor: "rgb(28, 78, 128)",
        lineTension: 0.5,
      },
    ],
  }
  
  const options= {
    plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: "black",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 15 // 'size' now within object 'font {}'
          }
        }
      }
    },
    scales: {
        y: {
            min: 0,
            max: 10,
            // suggestedMax:100,
            display:false,
        },
        yAxes: {
          min: 0,
          max:10,
          ticks: {
            color: "black"
          },
          // grid: {
          //   color:"#6B7380",
          //   display:false
          // }
        },
        xAxes: {
          ticks: {
            color: "black"
          },
          // grid: {
          //   color:"#6B7380",
          //   display:false
          // }
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