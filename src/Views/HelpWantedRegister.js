import React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/Slices/CurrentUserSlice';


import '../css/back.css';

import { getAuth, createUserWithEmailAndPassword , updateProfile  } from "firebase/auth";



function HelpWantedRegister() {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [name , setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');


    //user sign up
    const handleUserSignedIn = (e) => {

        e.preventDefault();
        setError('');
        
        //check if passwords match
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        //create user
        const auth = getAuth();
        createUserWithEmailAndPassword(auth , email, password)
        .then((user) => {
            console.log('user created : ' , user);
            setError('');

            //update display name
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                // Profile updated!
                dispatch(setCurrentUser(auth.currentUser));
                navigate('/helpwantsignupother' , { replace: true });
                
            }).catch((error) => {
                // An error occurred
                var errorMessage = error.message;
                setError(errorMessage);
            });


        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error code : ' , errorCode);
            console.log('error message : ' , errorMessage);
            setError(errorMessage);
        });

    }



    return (
        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Register</h1>

                <form style={styles.fieldContainer} onSubmit={ (e) => handleUserSignedIn(e) }>
                    
                    { error !== '' &&  (
                        <>
                            <Alert severity="error">{error}</Alert><br/>
                        </>
                    )}

                    <TextField
                        name='email'
                        type={'email'}
                        id="outlined-error-helper-text"
                        label="Email"
                        placeholder='Type your email'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={ (e) => setEmail(e.target.value) }
                    /><br/>

                    <TextField
                        name='displayName'
                        type={'text'}
                        id="outlined-error-helper-text"
                        label="Display Name"
                        placeholder='Type your Display Name'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={ (e) => setName(e.target.value) }
                    /><br/>

                    <TextField
                        name='password'
                        id="outlined-error-helper-text"
                        label="Password"
                        type="password"
                        placeholder='Type your password'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setPassword(e.target.value) }
                    /><br />

                    <TextField
                        name='confirmPassword'
                        id="outlined-error-helper-text"
                        label="Comfirm Password"
                        type="password"
                        placeholder='Comfirm password'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setConfirmPassword(e.target.value) }
                    />

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

export default HelpWantedRegister