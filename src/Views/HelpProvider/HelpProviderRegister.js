import React , {useState} from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';


//firebase imports
import { getAuth , createUserWithEmailAndPassword , updateProfile } from 'firebase/auth';

//redux imports
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/Slices/CurrentUserSlice';

//router dom imports
import { useNavigate } from 'react-router-dom';


import '../../css/back.css'


function HelpProviderRegister() {

    const [error, setError] = useState('');
    const [displayName , setDisplayName ] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [comfirmPassword , setComfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //handle form submit
    const handleProviderRegisterSubmit = (e) => {

        e.preventDefault();

        //validate form
        if(displayName === '' || email === '' || password === '' || comfirmPassword === ''){
            setError('Please fill all fields');
            return;
        }

        //check if password and comfirm password match
        if(password !== comfirmPassword){
            setError('Password and comfirm password do not match');
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
                displayName: displayName
            }).then(() => {
                // Profile updated!
                dispatch(setCurrentUser(auth.currentUser));
                navigate('/serviceProvidersignupother' , { replace: true });
                
            }).catch((error) => {
                // An error occurred
                let errorMessage = error.message;
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

                <form style={styles.fieldContainer} onSubmit={ (e) => handleProviderRegisterSubmit(e) }>

                    { error !== '' &&  (
                        <>
                            <Alert severity="error">
                                {error}
                            </Alert><br />
                        </>
                    )}

                    <TextField
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
                        type={'text'}
                        id="outlined-error-helper-text"
                        label="Display Name"
                        placeholder='Type your Display Name'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={ (e) => setDisplayName(e.target.value) }
                    /><br/>

                    <TextField
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
                        id="outlined-error-helper-text"
                        label="Comfirm Password"
                        type="password"
                        placeholder='Comfirm password'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setComfirmPassword(e.target.value) }
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

export default HelpProviderRegister


//HelpProviderRegister