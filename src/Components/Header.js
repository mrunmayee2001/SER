import React from 'react';
import mppolice from '../Assets/mp-police.png';

function Header() {
  return (
    <div className='Header'>
        <img src={mppolice} alt="Logo"  className='mpp-logo'/>
        <div className='page-title'>Madhya Pradesh Police</div>
    </div>
    
  )
}

export default Header