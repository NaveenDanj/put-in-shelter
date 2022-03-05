import React, {useState } from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function HelpWantedLogin() {

    const [error , setError] = useState('');


    return (
        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Help Wanted Login</h1>

                <form style={styles.fieldContainer} >

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





export default HelpWantedLogin