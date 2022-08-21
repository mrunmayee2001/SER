import React, { useEffect, useState } from "react";
import db from "../Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { GoogleMap, useLoadScript, MarkerF, HeatmapLayer, Circle } from "@react-google-maps/api";
const google = window.google;

function LocationMap(props) {
  const [Logs, setCallLogs] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const ref = collection(db, "Call-Logs");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setCallLogs(info);
    }
    fetchInfo();
  }, []);

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries : ['visualization']
  });
    
  if (!isLoaded) return <div>Loading...</div>;

  const center = { lat: 23.259933, lng: 77.412613 }
  
  var data = [
  ];
  
  Logs.map((val) => {
    if(props.emergency==val.Service){
      console.log(val.Location);
      //data.concat([val.Location]);
    }
  }
  );
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  }  
  const onLoad = circle => {
    console.log('Circle onLoad circle: ', circle)
  }
  const onUnmount = circle => {
    console.log('Circle onUnmount circle: ', circle)
  }

  return (
    <useLoadScript>
    <GoogleMap zoom={10} center={center} mapContainerClassName="Maps">
      <MarkerF position={center} />
      {/* <HeatmapLayer 
        data={data} 
      /> */}
      <Circle
      // optional
      onLoad={onLoad}
      // optional
      onUnmount={onUnmount}
      // required
      center={center}
      // required
      options={options}
    />
    </GoogleMap>
    </useLoadScript>
  );
}


export default LocationMap