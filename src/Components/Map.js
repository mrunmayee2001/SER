import React from 'react'
import Tabs from './Tabs'

function Maps() {
  return (
    <div className='Maps'>
      <div className='Map-Area'>
        <Tabs>
          <div label="Ambulance">
            <div className='Map'>
              
            </div>
          </div>
          <div label="Fire">
            <div className='Map'>Here is Fire map</div>
          </div>
          <div label="Police">
            <div className='Map'>Here is Police map</div> 
          </div>
        </Tabs>
      </div>
      <div className='Areawise-Rank'>Area wise rank</div>
    </div>
  )
}

export default Maps