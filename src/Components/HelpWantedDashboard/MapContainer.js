import React, { useEffect , useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';


//firebase imports
import {collection, getDocs ,  getFirestore } from "firebase/firestore"; 
import { Scale } from '@mui/icons-material';

//icons

const libraries = ["places"];

const mapContainerStyles = {
    width: '100%',
    height: '90vh',
}


function MapContainer() {

    const [userCurrentLocation , setUserCurrentLocation] = useState({lat:0 , lng:0});
    const [allShelters , setAllShelters] = useState([]);

    const fetchAllShelters = async () => {

        try{
            const shelterSnap = await getDocs(collection(getFirestore() , "serviceProviderUser"));
            shelterSnap.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setAllShelters(prevState => [...prevState , doc.data()]);
            });

        }catch(err){
            console.log(err);
        }


    }

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

        fetchAllShelters();
        
    } , []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
                zoom={10}
                center={{
                    lat: userCurrentLocation.lat,
                    lng: userCurrentLocation.lng
                }}
                onClick={(event) => handleAddLocation(event)}
            
            >

                {allShelters.map((shelter) => {
                    return (
                        <div>
                            <Marker
                                key={shelter.uid}
                                position={ {  lat : shelter.currentLocation.lat , lng : shelter.currentLocation.lng }}
                                icon={ { 
                                    url : "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-shelter-charity-kiranshastry-solid-kiranshastry.png",
                                    scaledSize : new window.google.maps.Size(30,30),
                                    origin : new window.google.maps.Point(0,0),
                                }}
                            />
                        </div>

                    );

                })}

            </GoogleMap>
        </div>
    )
}

export default MapContainer