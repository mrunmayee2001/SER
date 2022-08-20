import React from 'react'
import Tabs from './Tabs'
import LocationMap from './LocationMap'

function Maps() {
  return (
    <div className='Maps'>
      <div className='Map-Area'>
        <Tabs>
          <div label="Ambulance">
            <div className='Map'><LocationMap /></div>
          </div>
          <div label="Fire">
            <div className='Map'><LocationMap /></div>
          </div>
          <div label="Police">
            <div className='Map'><LocationMap /></div> 
          </div>
        </Tabs>
      </div>
      <div className='Areawise-Rank'>Area wise rank</div>
    </div>
  )
}

export default Maps