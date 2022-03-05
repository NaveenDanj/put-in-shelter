import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

import { useSelector , useDispatch } from 'react-redux';

//firebase firestore imports
import { doc, setDoc , getFirestore } from "firebase/firestore"; 



function HelpWantedOtherInfo() {

    let navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser.currentUser);
  
    const [error, setError] = React.useState('');
    const [gender , setGender] = React.useState('Male');
    const [peopleCount , setPeopleCount] = React.useState(0);
    const [currentLocation , setCurrentLocation] = React.useState(null);
    const [timePeriod , setTimePeriod] = React.useState(0);
    const [currentLocationSetIndicator , setCurrentLocationSetIndicator] = React.useState('current location not set');

    const db = getFirestore();

    useEffect(() => {

        //get current location
        if("geolocation" in navigator){

            navigator.geolocation.getCurrentPosition(function(position) {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });

            setCurrentLocationSetIndicator('current location set');

        }else{
            //geolocation not avaliable
            setError('User location not avaliable');
        }

    },[]);

    //handle form submit
    const handleFormSubmit = async (e) => {
        //prevent from reloading
        e.preventDefault();

        //check if all fields are filled
        if(currentLocation === null){
            setError('Please set your current location');
            return;
        }

        if(peopleCount === 0){
            setError('Please set people count');
            return;
        }

        if(timePeriod === 0){
            setError('Please set time period');
            return;
        }

        //clear error
        setError('');

        //send data to server
        try{
            await setDoc( doc(db , 'helpWantedUsers' , currentUser.uid ) , {
                uid : currentUser.uid,
                displayName : currentUser.displayName,
                email : currentUser.email,
                gender : gender,
                currentLocation : currentLocation,
                peopleCount : +peopleCount,
                timePeriod : +timePeriod
            });

            navigate('/helpwanted' , { replace: true });

        }catch(e){
            setError(e.message);
        }

    }
    
  
    return (

        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Personal Info</h1>

                <form style={styles.fieldContainer} onSubmit={(e) => handleFormSubmit(e)}>

                    { error !== '' &&  (
                        <>
                            <Alert severity="error">{error}</Alert><br/>
                        </>
                    )}

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={ (e) => setGender(e.target.value) }
                        value={ gender }
                        label="Gender"
                        size='small'
                        required
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select><br />

                    <TextField
                        type={'number'}
                        id="outlined-error-helper-text"
                        label="Peoples in your family"
                        placeholder='Enter number of people in your family'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={ (e) => setPeopleCount(e.target.value) }
                    /><br/>

                    
                    <TextField
                        id="outlined-error-helper-text"
                        label="Current Location"
                        type="text"
                        placeholder='Enter your current location'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setCurrentLocation(e.target.value) }
                        value={currentLocationSetIndicator}
                    /><br />

                    <TextField
                        id="outlined-error-helper-text"
                        label="Time Period (in weeks)"
                        type="number"
                        placeholder='How much time do you want to stay'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setTimePeriod(e.target.value) }
                    /><br />


                    <Button 
                        type="submit" 
                        className="gradient-background" style={{ marginTop : 25 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}
                    >
                        Next
                    </Button>

                </form>

            </Card>
            
        </div>

    );

}

const styles = {

    mainContainer : {
        color : 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },

    formContainer : {
        width : '60%',
        maxWidth : '500px',
        // height : '50vh',
    },

    headerText : {
        textAlign: 'center',
        fontWeight : 'bold',
    },

    fieldContainer : {
        padding : 25,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
    }

}




export default HelpWantedOtherInfo