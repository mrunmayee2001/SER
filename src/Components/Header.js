import React from 'react';
import mppolice from '../Assets/mp-police.png';

function Header() {
  const handleClick = () => {
    console.log("button clicked");
    fetch('http://192.168.137.179:5000/startRecording');
  };
  return (
    <div className='Header'>
        <img src={mppolice} alt="Logo"  className='mpp-logo'/>
        <div className='page-title'><b>Khaki Mitra</b></div>
        <div>
          <button type="button" className='AnswerCall' onClick={handleClick}>
          <b>Answer Call</b>
          </button>
        </div>
    </div>
    
  )
}

export default Header