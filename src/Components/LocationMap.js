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
import { GoogleMap, useLoadScript,Marker, MarkerF, HeatmapLayer, Circle ,InfoWindow, Fragment} from "@react-google-maps/api";
const google = window.google;

function LocationMap(props) {
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

  const center = { lat: 22.6759958, lng: 88.3297288 }
  
  var places = [
    {
      id: 1,
      name: "Park Slope",
      latitude: "23.259940",
      longitude: "77.412630",
      circle: {
        radius: 3000,
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
  
  
  var data = [];

  Logs.map((val) => {
    if(props.emergency==val.Service){
      console.log(val.Latitude);
      data.push({lat: val.Latitude, lng: val.Longitude});
    }
  }
  );
  console.log(data);

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
  
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // const radius = 300;
  return (
    <GoogleMap zoom={7} center={center} mapContainerClassName="Maps">
      <MarkerF position={center} />
      {places.forEach(place => {
          return (
            <React.Fragment key={place.id}>
              <Marker
                position={{
                  lat: parseFloat(place.latitude),
                  lng: parseFloat(place.longitude)
                }}
              />
              {place.circle && (
                <Circle
                  defaultCenter={{
                    lat: parseFloat(place.latitude),
                    lng: parseFloat(place.longitude)
                  }}
                  radius={place.circle.radius}
                  options={place.circle.options}
                />
              )}
            </React.Fragment>
          );
        })}
      {places.map((place) => (
        <Marker position={{lat: place.latitude, lng: place.longitude}} />
        // <Marker
        //   key={place.id}
        //   position={{lat: place.latitude, lng: place.longitude}}
        //   onClick={() => handleActiveMarker(placeid)}
        // >
          
        //     <InfoWindow onCloseClick={() => setActiveMarker(null)}>
        //       <div>{place.name}</div>
        //     </InfoWindow>
        // </Marker>
      ))}
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