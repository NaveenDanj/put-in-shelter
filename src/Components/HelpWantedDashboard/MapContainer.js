import React, { useEffect } from 'react'
import { GoogleMap, useLoadScript , Marker , InfoWindow } from '@react-google-maps/api';


const libraries = ["places"];

const mapContainerStyles = {
    width: '100%',
    height: '90vh',
}


function MapContainer() {

    useEffect(() => {
        console.log('api key is : ' , process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    } , []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (loadError) return "Error loading maps";

    if (!isLoaded) return "Loading maps";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyles}
                zoom={10}
                center={{
                    lat: -3.745,
                    lng: -38.523
                }}
            >
            </GoogleMap>
        </div>
    )
}

export default MapContainer