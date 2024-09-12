import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '50%',
  height: '600px',
  marginLeft: '5%',
  borderRadius: '20px',
  overflow: 'hidden',
  border: '3px solid #2c3e50',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7} />
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
