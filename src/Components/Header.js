import React from 'react';
import mppolice from '../Assets/mp-police.png';

function Header() {
  const handleClick = () => {
    console.log("button clicked");
    fetch('http://127.0.0.1:5000/startRecording');
  };
  return (
    <div className='Header'>
        <img src={mppolice} alt="Logo"  className='mpp-logo'/>
        <div className='page-title'>Madhya Pradesh Police</div>
        <div>
          <button type="button" className='AnswerCall' onClick={handleClick}>
            Answer Call
          </button>
        </div>
    </div>
    
  )
}

export default Header