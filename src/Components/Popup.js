import React from 'react';
import Popup from 'reactjs-popup';
import fire from '../Assets/fire.png';
function Pop(){
  return(
  <Popup
    trigger={<button className="button"> 
    <img src={fire} alt="Photo"  className='Rescue-Logo'/>
    <style>
      background-color:"#461e33"
    </style>
    </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> NOTIFICATION </div>
          <div className="content">
            {' '}
            RESCUE TEAM DISPATCHED
          </div>
        <div className="actions">
        </div>
      </div>
    )}
  </Popup>
  )
}

export default Pop;