import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF, HeatmapLayer } from "@react-google-maps/api";


function LocationMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        // libraries : ['visualization']
    });
      
    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
    
    function Map() {
        const center = useMemo(() => ({ lat: 23.259933, lng: 77.412613 }), []);
        // var myMvcArray = new google.maps.MVCArray();
        return (
          <GoogleMap zoom={10} center={center} mapContainerClassName="Maps">
            <MarkerF position={center} />
            {/* <HeatmapLayer data={myMvcArray} /> */}
          </GoogleMap>
        );
      }
}


export default LocationMap

