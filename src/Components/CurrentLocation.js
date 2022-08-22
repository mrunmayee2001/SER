import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, HeatmapLayer, Circle } from "@react-google-maps/api";
const google = window.google;

function CurrentLocation(props) {

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries : ['visualization']
  });
    
  if (!isLoaded) return <div>Loading...</div>;

  const center = { lat: 23.259933, lng: 77.412613 }

  return (
    <useLoadScript>
    <GoogleMap zoom={10} center={center} mapContainerClassName="Maps" containerElement={<div style={{ height: '100%' }} />}>
      <MarkerF position={center} />
    </GoogleMap>
    </useLoadScript>
  );
}


export default CurrentLocation