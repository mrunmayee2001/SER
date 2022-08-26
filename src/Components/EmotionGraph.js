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
      const ref = collection(db, "Call-Logs") ;
      onSnapshot(ref, (snapshot) => {
        setCallLogs(snapshot.docs.map(doc => ({
          Carrier: doc.Carrier,
          City: doc.City,
          Emotion: {
            Drunk: doc.Emotion.Drunk,
            Abusive: doc.Emotion.Abusive,
            Painful: doc.Emotion.Painful,
            Stressful: doc.Emotion.Stressful,
          },
          EndDate: doc.EndDate,
          StartDate: doc.StartDate,
          Latitude: doc.Latitude,
          Longitude: doc.Longitude,
          PhoneNo: doc.PhoneNo,
          SerEmotion: {
            result: doc.SerEmotion.result
          },
          Service: doc.Service,
          SubEmotion:{
            result: doc.SerEmotion.result,
          },
          Transcripts: doc.Transcripts
        })))
      })
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
        label: "Drunk",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(0, 145, 213, 0.1)",
        borderColor: "rgb(0, 145, 213)",
        lineTension: 0.5,
      },
      {
        label: "Abusive",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(126, 144, 154, 0.1)",
        borderColor: "rgb(126, 144, 154)",
        lineTension: 0.5,
      },
      {
        label: "Painful",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(234, 106, 71, 0.1)",
        borderColor: "rgb(234, 106, 71)",
        lineTension: 0.5,
      },
      {
        label: "Stressful",
        data: [0,0,0,0,0,0,0],
        fill: true,
        backgroundColor: "rgba(28, 78, 128, 0.1)",
        borderColor: "rgb(28, 78, 128)",
        lineTension: 0.5,
      }
    ]
  };
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
          display: false,
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
      if(val.Emotion.Drunk>val.Emotion.Abusive && val.Emotion.Drunk>val.Emotion.Painful && val.Emotion.Drunk>val.Emotion.Painful) {
        data['datasets'][0]['data'][timeperiod]++;
      }
      else if(val.Emotion.Abusive>val.Emotion.Drunk && val.Emotion.Abusive>val.Emotion.Painful && val.Emotion.Abusive>val.Emotion.Painful){
        data['datasets'][1]['data'][timeperiod]++;
      }
      else if(val.Emotion.Painful>val.Emotion.Abusive && val.Emotion.Painful>val.Emotion.Drunk && val.Emotion.Painful>val.Emotion.Drunk){
        data['datasets'][2]['data'][timeperiod]++;
      }
      else {
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