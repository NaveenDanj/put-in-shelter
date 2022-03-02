import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import '../css/back.css'


function HelpWantedRegister() {

    return (
        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Register</h1>

                <div style={styles.fieldContainer}>

                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="Username"
                        placeholder='Type your username'
                        // helperText="Incorrect entry."
                        size="small"

                    /><br/>

                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="Password"
                        type="password"
                        placeholder='Type your password'
                        // helperText="Incorrect entry."
                        size="small"
                        width="100%"

                    />

                    <Button class="gradient-background" style={{ marginTop : 15 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}>Login</Button>

                </div>



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