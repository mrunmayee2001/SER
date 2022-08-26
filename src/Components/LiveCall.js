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
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import Popup from './Popup';
// import Popup1 from './Popup1';
// import Popup2 from './Popup2';


function LiveCall() {
  const [isOpen1, setIsOpen1] = useState(false);
  const togglePopup1 = () => {
    setIsOpen1(!isOpen1);
  }
  const [isOpen2, setIsOpen2] = useState(false);
  const togglePopup2 = () => {
    setIsOpen2(!isOpen2);
  }
  const [isOpen3, setIsOpen3] = useState(false);
  const togglePopup3 = () => {
    setIsOpen3(!isOpen3);
  }

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
    },
    Situation: [],
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
    var Service = 'Police';
    if( person.Service.Ambulance>  person.Service.Fire &&  person.Service.Ambulance >  person.Service.Police){
      Service= 'Ambulance';
    }
    else if( person.Service.Fire>  person.Service.Police &&  person.Service.Fire >  person.Service.Ambulance){
      Service= 'Fire';
    }
    console.log('Fetched from Live call');
  }
  console.log(person);
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
    if(val.PhoneNo==PersonPhoneNo && !pastlist.includes(FinalEmotion)){
      pastlist.push(FinalEmotion);
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

  var analysisdata = {
    labels: ["0","5","10","20"],
    options: {
      plugins: {
        title: {
          display: true,
          text: 'TEST'
        }
      }
    },
    datasets: [
      {
        label: "Drunk",
        data: [1,3,0,1],
        fill: true,
        backgroundColor: "rgba(0, 145, 213, 0.1)",
        borderColor: "rgb(0, 145, 213)",
        lineTension: 0.5,
      },
      {
        label: "Abusive",
        data: [0,2,1,1],
        fill: true,
        backgroundColor: "rgba(126, 144, 154, 0.1)",
        borderColor: "rgb(126, 144, 154)",
        lineTension: 0.5,
      },
      {
        label: "Painful",
        data: [4,3,6,1],
        fill: true,
        backgroundColor: "rgba(234, 106, 71, 0.1)",
        borderColor: "rgb(234, 106, 71)",
        lineTension: 0.5,
      },
      {
        label: "Stressful",
        data: [0,2,4,2],
        fill: true,
        backgroundColor: "rgba(28, 78, 128, 0.1)",
        borderColor: "rgb(28, 78, 128)",
        lineTension: 0.5,
      }
    ]
  };

  var AnalisisData = []
  if(isLiveCall){
    LiveCallDocs.map((val)=>{
      AnalisisData.push({
        Drunk: 10,
      })
    })
  }
  
  const styleoptions= {
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
  function sendFireMessage() {
    console.log("Fire Brigade on the way");
    fetch('http://192.168.137.179:5000/FireService');
    fetch('http://192.168.137.179:5000/sendMessageDispatch');
  }
  function sendAmbulanceMessage() {
    console.log("Ambulance on the way");
    fetch('http://192.168.137.179:5000/AmbulanceService');
    fetch('http://192.168.137.179:5000/sendMessageDispatch');
  }
  function sendPoliceMessage() {
    console.log("Police on the way");
    fetch('http://192.168.137.179:5000/PoliceService');
    fetch('http://192.168.137.179:5000/sendMessageDispatch');
  }

  console.log(person.Situation);
  
  var sit= " ";
  if(isLiveCall){
    sit=person.Situation.result;
  }
  else if(person.Situation.length>0){
    sit=person.Situation[person.Situation.length-1].result;
  }
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
        <b>
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
        <div className='Details6'>
          Situation 
        </div>
        <div className='Details7'>
          <div className='Message'>
            <div>{sit}</div>
          </div>
        </div>
        </b>
      </div>
      
      <div className='Emotions'>
        {(!isLiveCall&& Object.keys(person.Emotion).length>0) ?
          (<PieChart highcharts={Highcharts} options={piechartoptions} />)
          :
          (<div style={{padding:'30px'}}>Loading...</div>)
        }
        
      </div>
      <div className="Call-Analysis">
        <Line data={analysisdata} height="120px" options={styleoptions}/>
      </div>
      <div className='Location' >
        <CurrentLocation center={CurrLocation}/>
      </div>
      
      <div className="reload-button" >
        <button onClick={reload}>Get Recent Results</button>
      </div>

      <div className='dispatch'>
        <div className='Rescue-Team'>
          <button type="button" className='Rescue-Team' onClick={togglePopup1} >
            <img src={fire} alt="Photo"  className='Rescue-Logo'/>
          </button>
          {isOpen1 && <Popup
            content={<>
              <b>Confirmation</b>
              <p>Do you want to send Fire Brigade for help?</p>
              <button onClick={sendFireMessage}>Test button</button>
            </>}
            handleClose={togglePopup1}
          />}
        </div>
        <div className='Ambulance-Team'>
          <button type="button" className='Police-Team' onClick={togglePopup2} >
            <img src={police} alt="Photo"  className='Rescue-Logo'/>
          </button>
          {isOpen2 && <Popup
            content={<>
              <b>Confirmation</b>
              <p>Do you want to send Ambulance for help?</p>
              <button onClick={sendAmbulanceMessage}>Send Ambulance</button>
            </>}
            handleClose={togglePopup2}
          />}
        </div>
        <div className='Police-Team'>
          <button type="button" className='Ambulance-Team' onClick={togglePopup3} >
            <img src={ambulance} alt="Photo"  className='Rescue-Logo'/>
          </button>
          {isOpen3 && <Popup
            content={<>
              <b>Confirmation</b>
              <p>Do you want to send Police Team for help?</p>
              <button onClick={sendPoliceMessage}>Send Police Team</button>
            </>}
            handleClose={togglePopup3}
          />}
        </div>
      </div>
    </div>
  )
}

export default LiveCall