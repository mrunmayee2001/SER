import React from 'react';
import PersonPhoto from '../Assets/Ira.jpg';
import fire from '../Assets/fire.png';
import police from '../Assets/police.png';
import ambulance from '../Assets/ambulance.png';
import RescueLogo from '../Assets/rescue-team.png';
import LocationMap  from './LocationMap.js';
import Emotionpie from './Emotionpie';


function LiveCall() {
  return (
    <div className='Live-Call'>
      <div className='Person'>
        <img src={PersonPhoto} alt="Photo"  className='Photo'/>
        <div className='Info'>
          <div className='Name'><h2>+91 98927821213 </h2></div>
          <div className='Details'>
            Latitude:12'34567 | Longitude:14'23456
          </div>
          <div className='Details2'>
           Service Provider: Airtel
          </div>
          <div className='Details3'>
           Past History: Abusive, Drunk
          </div>

        </div>
      </div>
      <div className='Emotions2'>
        <div className='Details2'>
        Current <br></br>Emotion
        </div>
        <div className='Details3'>
        Angry
        </div>
      </div>
      <div className='Emotions'><Emotionpie/></div>
     
      <div className='Location'><LocationMap /></div>
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