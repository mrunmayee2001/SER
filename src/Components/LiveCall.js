import React from 'react';
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
  const CurrentEmotion = 'Drunk';
  const SubEmotion ='Very Happy'
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
        Current Emotion
        </div>
        <div className='Details3'>
          <div className='Photo'>
            <img src={CurrEmoLogo} alt="Photo"  className='Photo'/>
          </div>
          <div className='Message'>
            Drunk
          </div>
        </div>
        <div className='Details4'>
        Sub Emotion
        </div>
        <div className='Details5'>
          <div className='Message'>
            Drunk
          </div>
        </div>
      </div>
      <div className='Emotions'><Emotionpie/></div>
     
      <div className='Location'>
        <CurrentLocation />
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