import React, { useEffect , useState } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';


const libraries = ["places"];

const mapContainerStyles = {
    width: '100%',
    height: '90vh',
}


function MapContainerSP() {

    const [userCurrentLocation , setUserCurrentLocation] = useState({lat:0 , lng:0});

    useEffect(() => {

        if ("geolocation" in navigator) {
            console.log("Available");

            navigator.geolocation.getCurrentPosition(function(position) {
                setUserCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });

        } else {
            console.log("Not Available");
        }
        
    } , []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey : import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if (loadError) return "Error loading maps";

    if (!isLoaded) return "Loading maps";


    const handleAddLocation = (location) => {
        console.log("lat : " , location.latLng.lat() , "lng : " , location.latLng.lng());
    }



    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyles}
                zoom={15}
                center={{
                    lat: userCurrentLocation.lat,
                    lng: userCurrentLocation.lng
                }}
                onClick={(event) => handleAddLocation(event)}
            >
            </GoogleMap>
        </div>
    )
}

export default MapContainerSP