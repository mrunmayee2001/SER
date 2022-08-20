import React from 'react'
import RecentEmergencies from './RecentEmergencies'
import EmotionGraph from './EmotionGraph'
import EmergencyGraph from './EmergencyGraph'

function Dashboard() {
  return (
    <div className='Dashboard'>
      <div className='Emotion-graph'><EmotionGraph/></div>
      <div className='Recent-Emergency'><RecentEmergencies/></div>
      <div className='Emergency-graph'><EmergencyGraph/></div>
    </div>
  )
}

export default Dashboard