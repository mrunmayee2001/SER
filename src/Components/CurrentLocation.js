import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, HeatmapLayer, Circle } from "@react-google-maps/api";
const google = window.google;

function CurrentLocation(props) {

  const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries : ['visualization']
  });
    
  if (!isLoaded) return <div>Loading...</div>;

  const center = props.center;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="Maps" containerElement={<div style={{ height: '150' }} />}>
      <MarkerF position={center} />
    </GoogleMap>
  );
}


export default CurrentLocation