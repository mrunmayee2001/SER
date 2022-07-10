import React from 'react';
import PersonPhoto from '../Assets/Ira.jpg';
import RescueLogo from '../Assets/rescue-team.png';

function LiveCall() {
  return (
    <div className='Live-Call'>
      <div className='Person'>
        <img src={PersonPhoto} alt="Photo"  className='Photo'/>
        <div className='Info'>
          <div className='Name'><h2>PersonalData </h2></div>
          <div className='Details'>
            Age: 21 | Id No.: 2315646541
          </div>
          <div className='Call-Status'> 51:27 </div>
        </div>
      </div>
      <div className='Emotions'>Emotions Stats</div>
      <div className='Personal-Info'>Personal Info</div>
      <div className='Location'>Location</div>
      <div className='Rescue-Team'>
        <img src={RescueLogo} alt="Photo"  className='Rescue-Logo'/>
        <div className='Rescue-Msg'>Dispatch Rescue Team to the Location immediately</div>
      </div>
    </div>
  )
}

export default LiveCall