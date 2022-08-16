import React from 'react'
import ServiceCard from './ServiceCard';

function Dashboard() {
  return (
    <div className='Dashboard'>
      <div className='Emotion-graph'>Emotion graph</div>
      <div className='Recent-Emergency'><ServiceCard /></div>
      <div className='Recent-Calls'>Recent Calls</div>
      <div className='Emergency-graph'>Emergency graph</div>
    </div>
  )
}

export default Dashboard