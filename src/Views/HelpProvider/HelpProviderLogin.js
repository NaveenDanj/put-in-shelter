import React, {useState } from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/Slices/CurrentUserSlice';



function HelpProviderLogin() {

    const [error , setError] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();


    const handleFormSubmit = async(e) => {
        e.preventDefault();

        //validate inputs
        if(email === '' || password === ''){
            setError('Please fill in all fields');
            return;
        }

        //send request to server
        try{

            const userCredential =  await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            dispatch(setCurrentUser(user));
            navigate('/helpprovider' , { replace: true });

        }catch(err){
            setError(err.message);
        }
        
    }

    return (
        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Help Provider Login</h1>

                <form style={styles.fieldContainer} onSubmit={(e) => handleFormSubmit(e) } >

                    { error !== '' &&  (
                        <>
                            <Alert severity="error">{error}</Alert><br/>
                        </>
                    )}

                    <TextField
                        type={'email'}
                        id="outlined-error-helper-text"
                        label="Email"
                        placeholder='Enter your email here'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        onChange={ (e) => setEmail(e.target.value) }
                    /><br/>

                    
                    <TextField
                        id="outlined-error-helper-text"
                        label="Password"
                        type="password" 
                        placeholder='Enter your password'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"
                        required
                        onChange={ (e) => setPassword(e.target.value) }
                    /><br />


                    <Button 
                        type="submit" 
                        className="gradient-background" style={{ marginTop : 25 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}
                    >
                        Login
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





export default HelpProviderLogin