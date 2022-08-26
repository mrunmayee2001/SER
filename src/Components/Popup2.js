import React from 'react';
import Popup from 'reactjs-popup';
import fire from '../Assets/policee.png';

function Pop2(){
  return(
  <Popup
    trigger={
    <button color="#ff5c5c" className="button" > 
    <img src={fire} alt="Photo"  className='Rescue-Logo'/>
    </button>
    }
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> CONFIRMATION </div>
        <div className="content">
          {' '}
          Do you want to dispatch a team?
          
        </div>
        <div className="actions">
        <button color="#ff5c5c" className="button" > 
    YES
    </button>
    <button color="#ff5c5c" className="button" > 
    NO
    </button>


        </div>
      </div>
    )}
  </Popup>
  )
}

export default Pop2;