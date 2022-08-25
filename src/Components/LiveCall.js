import React, { useEffect, useState } from "react";
import db from "../Firebase";
import {doc,onSnapshot,collection,query,where,getDocs,} from "firebase/firestore";
import { ref, getStorage, getDownloadURL } from "firebase/firestore";
import PersonPhoto from '../Assets/DP.png';
import fire from '../Assets/fire.png';
import police from '../Assets/police.png';
import ambulance from '../Assets/ambulance.png';
import RescueLogo from '../Assets/rescue-team.png';
import CurrentLocation from './CurrentLocation';
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PieChart from "highcharts-react-official";
import Popup from 'reactjs-popup';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';


function LiveCall() {
  const [LiveCallDocs, setLiveCallDocs] = useState([]);
  useEffect(() => {
    async function fetchInfo() {
      const ref = collection(db, "Live-Call");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setLiveCallDocs(info);
    }
    fetchInfo();
  }, []);

  const [Logs, setCallLogs] = useState([]);
  useEffect(() => {
    async function fetchInfo() {
      const ref = collection(db, "Call-Logs");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      //window.location.reload();
      setCallLogs(info);
    }
    fetchInfo();
  }, []);

  function reload(){
    async function fetchInfo() {
      const ref1 = collection(db, "Call-Logs");
      const info1 = [];
      const data1 = await query(getDocs(ref1));
      data1.forEach((doc) => {
        info1.push(doc.data());
      });
      console.log("Reloaded!")
      setCallLogs(info1);

      const ref = collection(db, "Live-Call");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setLiveCallDocs(info);
    }
    fetchInfo();
  }

  //initiaally assigning last person's details
  var person = {
    PhoneNo: '',
    Carrier: '',
    Latitude: 15,
    Longitude: 15,
    Service:'Police',
    Emotion:{
      Drunk:10,
      Abusive: 10,
      Painful:50,
      Stressful:30
    },
    SubEmotion: {
      result:"very cool"
    }
  }
  var isLiveCall = false;
  if(Logs.length>0){
    person= Logs[0];
    var Service = person.Service;
    console.log('Fetched from logs');
  }
  if(LiveCallDocs.length>0){
    isLiveCall=true;
    person= LiveCallDocs[LiveCallDocs.length -1];
    var Service = 'Fire';
    if( person.Service.Ambulance>  person.Service.Fire &&  person.Service.Ambulance >  person.Service.Police){
      Service= 'Ambulance';
    }
    else if( person.Service.Police>  person.Service.Fire &&  person.Service.Police >  person.Service.Ambulance){
      Service= 'Police';
    }
    console.log('Fetched from Live call');
  }
  var PersonPhoneNo = person.PhoneNo;
  var Latitude = person.Latitude;
  var Longitude = person.Longitude;
  var Carrier = person.Carrier;
  var SubEmotion = person.SubEmotion.result;
  var CurrLocation = {lat: Latitude, lng: Longitude};

  var FinalEmotion = "";
  if(isLiveCall){
    var maxEmoList= []
    LiveCallDocs.map((val)=>{
      maxEmoList.push(val.SerEmotion.result);
    })
    var maxEmoMap = maxEmoList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    FinalEmotion = [...maxEmoMap.entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[0];//Object.keys(maxEmoMap).reduce(function(a, b){ return maxEmoMap[a] > maxEmoMap[b] ? a : b });
    console.log(FinalEmotion);
  }
  else{
    if(person.Emotion.Drunk>person.Emotion.Abusive && person.Emotion.Drunk>person.Emotion.Painful && person.Emotion.Drunk>person.Emotion.Painful){
      FinalEmotion = 'Drunk';
    }
    else if(person.Emotion.Abusive>person.Emotion.Drunk && person.Emotion.Abusive>person.Emotion.Painful && person.Emotion.Abusive>person.Emotion.Painful){
      FinalEmotion = 'Abusive';
    }
    else if(person.Emotion.Painful>person.Emotion.Abusive && person.Emotion.Painful>person.Emotion.Drunk && person.Emotion.Painful>person.Emotion.Drunk){
      FinalEmotion = 'Painful';
    }
    else{
      FinalEmotion= 'Stressful';
    }
  }

  
  const pastlist=[];
  Logs.map((val) => {
    if(val.PhoneNo==PersonPhoneNo && !pastlist.includes('Drunk')){
      pastlist.push('Drunk');
    }
  })
  console.log(pastlist);
  
  const piechartoptions = {
    chart: {
      backgroundColor:"#f1f1f1" ,
      width: 405,
      height: 200,
      borderRadius: 15,
      type: "pie"
      
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'middle',
      color:"#000000",
      itemMarginTop: 5,
      itemMarginBottom: 5
    },
    title: {
      text: "Caller Emotion",
      style: {
        color:"black",
        fontWeight:"bold",
        fontFamily:"Roboto"
      },
    },
    credits: {
      enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        size: 150,
        alignSelf: 'right',
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          color:"black"
        },
        showInLegend: false
      }
    },
    series: [
      {
        name: "Value",
        color: "#1E2D7D",
        lineWidth: 1,
        marker: {
          enabled: true,
          symbol: "circle",

          radius: 1,
          states: {
            hover: {
              enabled: true,
            
            }
          }
        },
        data: [
          {
            name:"Drunk",
            color:"#0091D5",
            y: isLiveCall? 20: person.Emotion.Drunk,
            sliced: false
          },
          {
            name:"Abusive",
            color:"#7E909A",
            y: isLiveCall? 10: person.Emotion.Abusive,
            sliced: false
          },
          {
            name:"Stressful",
            color:"#f85e00",
            y: isLiveCall? 30: person.Emotion.Stressful,
            sliced: false
          },
          {
            name:"Painful",
            color:"#1C4E80",
            y: isLiveCall? 40: person.Emotion.Painful,
            sliced: false
          }
        ]
      }
    ]
  };

  var data = {
    labels: [],
    plugins:{
      title:{
        display: true,
        text: 'Trend Analysis',
      }
    },
    datasets: [
      {
        label: "Drunk",
        data: [],
        fill: true,
        backgroundColor: "rgba(0, 145, 213, 0.1)",
        borderColor: "rgb(0, 145, 213)"
      },
      {
        label: "Abusive",
        data: [],
        fill: true,
        backgroundColor: "rgba(126, 144, 154, 0.1)",
        borderColor: "rgb(126, 144, 154)"
      },
      {
        label: "Painful",
        data: [],
        fill: true,
        backgroundColor: "rgba(234, 106, 71, 0.1)",
        borderColor: "rgb(234, 106, 71)"
      },
      {
        label: "Stressful",
        data: [],
        fill: true,
        backgroundColor: "rgba(28, 78, 128, 0.1)",
        borderColor: "rgb(28, 78, 128)"
      }
    ]
  };

  var AnalisisData = []
  if(isLiveCall){
    LiveCall.map((val)=>{
      AnalisisData.push({
        Drunk: 10,
      })
    })
  }
  
  const options= {
    plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: "black",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 10 // 'size' now within object 'font {}'
          }
        }
      }
    },
    scales: {
      y: {
          min: 0,
          max: 100,
          display: false,
      },
      yAxes: {
        min: 0,
        max:100,
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
  return (
    <div className='Live-Call'>
      <div className='Person'>
        <img src={PersonPhoto} alt="Photo"  className='Photo'/>
        <div className='Info'>
          <div className='Name'><h2>{PersonPhoneNo} </h2></div>
          <div className='Details'>
            Latitude: {Latitude} | Longitude: {Longitude}
            <p></p>
          </div>
          <div className='Details2'>
            Carrier: {Carrier}
            <p></p>
          </div>
          <div className='Details3'>
            Past History: 
            {pastlist.map((val) => {
              return(
                <div>{val}</div>
              )
              }
            )}
          </div>
        </div>
      </div>
      <div className='Emotions2'>
        <div className='Details2'>
          Current Emotion
        </div>
        <div className='Details3'>
          <div className='Message'>
            {FinalEmotion}
          </div>
        </div>
        <div className='Details4'>
          Service Needed
        </div>
        <div className='Details5'>
          <div className='Message'>
            {Service}
          </div>
        </div>
        <div className='Details6'>
          Sub Emotion
        </div>
        <div className='Details7'>
          <div className='Message'>
            {SubEmotion}
          </div>
        </div>
      </div>
      
      <div className='Emotions'>
        {(!isLiveCall&& Object.keys(person.Emotion).length>0) ?
          (<PieChart highcharts={Highcharts} options={piechartoptions} />)
          :
          null
        }
        
      </div>
      <div className="Call-Analysis">
        <Line data={data} height="120px" options={options}/>
      </div>
      <div className='Location' >
        <CurrentLocation center={CurrLocation}/>
      </div>
      
      <div className="reload-button" >
        <button onClick={reload}>Get Recent Results</button>
      </div>
    </div>
  )
}

export default LiveCall