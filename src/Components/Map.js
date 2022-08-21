import React from 'react'
import Tabs from './Tabs'
import LocationMap from './LocationMap'
import AreaRanks from './AreaRanks'

function Maps() {
  return (
    <div className='Maps'>
      <div className='Map-Area'>
          <Tabs>
            <div label="Ambulance TabArea">
              <div className='Map'><LocationMap emergency='Ambulance'/></div>
              <div className='Areawise-Rank'><AreaRanks emergency='Ambulance'/></div>
            </div>
            <div label="Fire TabArea">
              <div className='Map'><LocationMap emergency='Fire'/></div>
              <div className='Areawise-Rank'><AreaRanks emergency='Fire'/></div>
            </div>
            <div label="Police TabArea">
              <div className='Map'><LocationMap emergency='Police'/></div> 
              <div className='Areawise-Rank'><AreaRanks emergency='Police'/></div>
            </div>
          </Tabs>
        
      </div>
      
    </div>
  )
}

export default Maps