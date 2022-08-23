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
import PersonPhoto from '../Assets/DP.png';
import fire from '../Assets/fire.png';
import police from '../Assets/police.png';
import ambulance from '../Assets/ambulance.png';
import RescueLogo from '../Assets/rescue-team.png';
import CurrentLocation from './CurrentLocation';
import Emotionpie from './Emotionpie';
import Drunk from '../Assets/Drunk.png';
import Abusive from '../Assets/Abusive.png';
import Painful from '../Assets/Painful.png';
import Stressful from '../Assets/Stressful.png';

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
      setCallLogs(info);
    }
    fetchInfo();
  }, []);

  //initiaally assigning last person's details
  var person = {
    PhoneNo: '',
    Carrier: '',
    Latitude: 15,
    Longitude: 15,
    Service:''
  }
  if(Logs.length>0){
    person= Logs[Logs.length -1];
    var Service = person.Service;
  }
  else if(LiveCallDocs.length>0){
    person= LiveCallDocs[LiveCallDocs.length -1];
    var Service = 'Fire';
    if( person.Service.Ambulance>  person.Service.Fire &&  person.Service.Ambulance >  person.Service.Police){
      Service= 'Ambulance';
    }
    else if( person.Service.Police>  person.Service.Fire &&  person.Service.Police >  person.Service.Ambulance){
      Service= 'Police';
    }
  }
  var PersonPhoneNo = person.PhoneNo;
  var CurrentEmotion = 'Drunk';//person.Emotion;
  var Latitude = person.Latitude;
  var Longitude = person.Longitude;
  var Carrier = person.Carrier;
  var CurrLocation = {lat: Latitude, lng: Longitude};

  var CurrEmoLogo = Stressful;
  if(CurrentEmotion=='Drunk'){
    CurrEmoLogo = Drunk;
  }
  else if(CurrentEmotion=='Abusive'){
    CurrEmoLogo = Abusive;
  }
  else if(CurrentEmotion=='Painful'){
    CurrEmoLogo = Painful;
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
            {Logs.map((val) => {
              if(val.PhoneNo==PersonPhoneNo){
                return(
                  <div>Drunk</div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className='Emotions2'>
        <div className='Details2'>
          Current Emotion
        </div>
        <div className='Details3'>
          <div className='Photo'>
            <img src={CurrEmoLogo} alt="Photo"  className='Photo'/>
          </div>
          <div className='Message'>
            {CurrentEmotion}
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
      </div>
      
      {/* <div className='Emotions'>
        {Object.keys(person.Emotion).length>0 ?
          (<Emotionpie DrunkVal={person.Emotion.Drunk} AbusiveVal={person.Emotion.Abusive} StressfulVal={person.Emotion.Stressful} PainfulVal={person.Emotion.Painful}/>)
          :
          null
        }
      </div> */}
     
      <div className='Location' >
        <CurrentLocation center={CurrLocation}/>
      </div>
      <div className='dispatch'>
        <div className='Rescue-Team'>
          <img src={fire} alt="Photo"  className='Rescue-Logo'/>
        </div>
        <div className='Ambulance-Team'>
          <img src={ambulance} alt="Photo"  className='Rescue-Logo'/>
        </div>
        <div className='Police-Team'>
          <img src={police} alt="Photo"  className='Rescue-Logo'/>
        </div>
      </div>
    </div>
  )
}

export default LiveCall