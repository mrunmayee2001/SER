import React from 'react'
import Tabs from './Tabs'
import LocationMap from './LocationMap'
import AreaRanks from './AreaRanks'

function Maps() {
  return (
    <div className='Maps'>
      <div className='Map-Area'>
          <Tabs>
            <div label="Ambulance" className=' TabArea'>
              <div className='Map'>
                <LocationMap/>
              </div>
              <div className='Areawise-Rank'><AreaRanks emergency='Ambulance'/></div>
            </div>
            <div label="Fire" className=' TabArea'>
              <div className='Map'>
                <LocationMap/>
              </div>
              <div className='Areawise-Rank'><AreaRanks emergency='Fire'/></div>
            </div>
            <div label="Police"  className=' TabArea'>
              <div className='Map'>
                <LocationMap/>
              </div> 
              <div className='Areawise-Rank'><AreaRanks emergency='Police'/></div>
            </div>
          </Tabs>
        
      </div>
      
    </div>
  )
}

export default Maps