import React, { useEffect , useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


import { GoogleMap , Marker } from '@react-google-maps/api';


const mapContainerStyles = {
    width: '100%',
    height : '40vh'
}



function SetMyLocation(props) {
  
    const { open, setOpen } = props;
    const [location , setLocation] = useState({
        lat : 6.7495 ,
        lng : 79.913
    });

    const [locationText , setLocationText] = useState('');


    //set location
    const handleAddLocation = (e) => {
        setLocation({
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
        })

        setLocationText(e.latLng.lat() + ' , ' + e.latLng.lng());

    }

    //handle set location form submit
    const handleSetLocationSubmit = (e) => {

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
                </DialogContentText>

                <GoogleMap 

                    mapContainerStyle={mapContainerStyles}
                    zoom={25}
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

                    <TextField
                        type={'text'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your family members here'
                        size="small"
                        required
                        aria-readonly
                        value={locationText}
                    /><br/>
                   
                    <Button 
                        type="submit" 
                        className="gradient-background" style={{ marginTop : 25 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}
                    >
                        UPDATE CURRENT LOCATION
                    </Button>

                </form>


            </DialogContent>

            <DialogActions>

                <Button autoFocus onClick={() => setOpen(false)}>
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