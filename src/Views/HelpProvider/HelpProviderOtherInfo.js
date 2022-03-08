import React , {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert } from '@mui/material';


//firebase imports
import { doc, setDoc , getFirestore } from 'firebase/firestore';

//redux imports
import { useSelector } from 'react-redux';

//router imports
import { useNavigate } from 'react-router-dom';


function HelpProviderOtherInfo() {

    let user = useSelector(state => state.currentUser.currentUser);
    const navigate = useNavigate();
    const db = getFirestore();

    const [error , setError] = useState('');
    const [gender , setGender] = useState('Male');
    const [peopleCapacity , setPeopleCount] = useState(0);
    const [currentLocation , setCurrentLocation] = useState({
        lat : null,
        lng : null
    });
    const [locationText , setLocationText] = useState('');


    const [timePeriod , setTimePeriod] = useState(0);

    useEffect(() => {

        //get current location
        if("geolocation" in navigator){

            navigator.geolocation.getCurrentPosition(function(position) {
                
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                setLocationText(position.coords.latitude + ' , ' + position.coords.longitude);
            });


        }else{
            //geolocation not avaliable
            setError('User location not avaliable');
        }


    } ,[]);


    //form submit
    const handleProviderOtherInfoSubmit = async (e) => {
        e.preventDefault();
        console.log('user is ' , user);

        setError('');

        //validate form
        if( gender === '' || +peopleCapacity === 0 || +timePeriod === 0 || locationText === '' ){
            setError('Please fill out all fields');
            return;
        }

        //check user exists
        if(!user){
            setError('Service provider auth data not provided!');
            return;
        }

        //create user info
        try{
            await setDoc( doc(db , 'serviceProviderUser' , user.uid ) , {
                uid : user.uid,
                displayName : user.displayName,
                email : user.email,
                gender : gender,
                currentLocation : currentLocation,
                peopleCount : +peopleCapacity,
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

                <form style={styles.fieldContainer} onSubmit={ (e) => handleProviderOtherInfoSubmit(e) }>

                    { error !== '' && ( <><Alert severity="error">{ error }</Alert><br/> </>) }

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        size='small'
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select><br />

                    <TextField
                        type={'number'}
                        id="outlined-error-helper-text"
                        label="Peoples you can serve"
                        placeholder='Enter how many peoples can stay with you'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={(e) => setPeopleCount(e.target.value)}
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
                        aria-readonly
                        value={locationText}
                    /><br />

                    <TextField
                        id="outlined-error-helper-text"
                        label="Time Period (in weeks)"
                        type="number"
                        placeholder='Time period'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={(e) => setTimePeriod(e.target.value)}
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



export default HelpProviderOtherInfo