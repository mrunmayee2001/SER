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
import { GoogleMap, useLoadScript,Marker, MarkerF, HeatmapLayer, Circle ,InfoWindow} from "@react-google-maps/api";
const google = window.google;

function LocationMap() {
  const [Logs, setCallLogs] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
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
  
  var place = [ 
    {
      id:1,
      name: "Chicago, Illinois",
      latitude: "23.259940", 
      longitude: "77.412620",
      circle: {
        radius:3000,
        options: {
          strokeColor: "#ff0000",
        }
      }
    },
    // {
    //   id:2,
    //   name: "Chicago, Illinois",
    //   position: { lat: 23.259950, lng: 77.412630 }
    // },
    // {
    //   id:3,
    //   name: "Chicago, Illinois",
    //   position: { lat: 23.259960, lng: 77.412640 }
    // },
  ];
  
  // Logs.map((val) => {
  //   if(props.emergency==val.Service){
  //     data.push({lat: val.Location.lat, lng: val.Location.lng});
  //   }
  // }
  // );
  // console.log(data);

  // const options = {
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35,
  //   clickable: false,
  //   draggable: false,
  //   editable: false,
  //   visible: true,
  //   radius: 30000,
  //   zIndex: 1
  // }  
  
  // const onLoad = circle => {
  //   console.log('Circle onLoad circle: ', circle);
  // }
  // const onUnmount = circle => {
  //   console.log('Circle onUnmount circle: ', circle)
  // }
  
  // const handleOnLoad = (map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   data?.forEach(({ position }) => {
  //     bounds.extend(position)
  //   }
  //   );
  //   map.fitBounds(bounds);
  // };
  
  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker);
  // };

  // const radius = 300;
  return (
    <GoogleMap zoom={7} center={center} mapContainerClassName="Maps">
      {/* {data.map(({id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))} */}
      {/* <HeatmapLayer 
        data={data} 
      /> */}
      {/* {place.map(place=>{
        <React.Fragment key={place.id}>
          <Circle
            defaultCenter = {{
              lat: parseFloat(place.latitude),
              lng: parseFloat(place.longitude)
            }}
            radius={place.circle.radius}
            options={place.circle.options}
          />
        </React.Fragment>
      })} */}
    </GoogleMap>
  );
}


export default LocationMap