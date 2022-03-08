import React, { useEffect , useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

//maps api
import { GoogleMap , Marker } from '@react-google-maps/api';

//firebase inputs
import {doc, getDoc , updateDoc ,  getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

//redux imports
import { useSelector } from 'react-redux';


const mapContainerStyles = {
    width: '100%',
    height : '40vh'
}



function SetMyLocation(props) {

    let user = useSelector(state => state.currentUser);
  
    const { open, setOpen } = props;
    const [location , setLocation] = useState({
        lat : 6.7495 ,
        lng : 79.913
    });
    const db = getFirestore();
    const auth = getAuth();

    const [locationText , setLocationText] = useState('');
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    

    
    //fetch user location data
    useEffect(() => {
        
        const userDocRef = doc(db , 'helpWantedUsers' , user.currentUser.uid);
        
        getDoc(userDocRef)
        .then(userInfo => {
            setLocation({
                lat : userInfo.data().currentLocation.lat ,
                lng : userInfo.data().currentLocation.lng
            });

            setLocationText(userInfo.data().currentLocation.lat + ' , ' + userInfo.data().currentLocation.lng);

        })
        .catch(err => console.log(err));
        
    } ,[]);


    //set location
    const handleAddLocation = (e) => {
        setLocation({
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
        })

        setLocationText(e.latLng.lat() + ' , ' + e.latLng.lng());

    }

    //handle set location form submit
    const handleSetLocationSubmit = async(e) => {
        
        e.preventDefault();

        //validate input
        if(locationText === ''){
            setError('Please select a location');
            return;
        }

        try{
            //get user
            const user = getAuth().currentUser;

            //get user doc
            const userDocRef = doc(getFirestore() , 'helpWantedUsers' , user.uid);

            //update user doc
            updateDoc(userDocRef , {
                currentLocation : {
                    lat : location.lat,
                    lng : location.lng
                }
            })

            setSuccess('Location set successfully');

        }catch(err){
            setError(err.message);
            
        }

    }

  
    return (

        <Dialog
            fullWidth = {true}
            maxWidth = "md"
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Set your current Location</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description">
                    Please select your current location on the map.
                </DialogContentText><br/>

                <GoogleMap 

                    mapContainerStyle={mapContainerStyles}
                    zoom={15}
                    center={{
                        lat: location.lat,
                        lng: location.lng
                    }}

                    onClick={(event) => handleAddLocation(event)}
            
                >

                    <Marker
                        position={location}
                    />

                </GoogleMap>

                <form style={styles.formContainer} onSubmit={(e) => handleSetLocationSubmit(e) } >

                    { error !== '' &&  (
                        <>
                            <Alert severity="error">{error}</Alert><br/>
                        </>
                    )}

                    { success !== '' &&  (
                        <>
                            <Alert severity="success">{success}</Alert><br/>
                        </>
                    )}

                    <TextField
                        type={'text'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your family members here'
                        size="small"
                        required
                        aria-readonly
                        value={locationText}
                    />
                   
                    <Button 
                        type="submit" 
                        className="gradient-background" style={{ marginTop : 25 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}
                    >
                        UPDATE CURRENT LOCATION
                    </Button>

                </form>


            </DialogContent>

            <DialogActions>

                <Button autoFocus onClick={() => { 
                        setOpen(false);
                        setError('');
                        setSuccess('');
                    } 
                }>
                    Close
                </Button>

            </DialogActions>

        </Dialog>
    );
}

const styles = {

    formContainer : {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop : 25
    }


}

export default SetMyLocation