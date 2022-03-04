import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import '../../css/back.css'


function HelpProviderRegister() {

    return (
        <div className='gradient-background' style={ styles.mainContainer }>

            <Card style={ styles.formContainer} variant="outlined">
                
                <h1 style={ styles.headerText }>Register</h1>

                <form style={styles.fieldContainer}>

                    <TextField
                        type={'email'}
                        id="outlined-error-helper-text"
                        label="Email"
                        placeholder='Type your email'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                    /><br/>

                    <TextField
                        type={'text'}
                        id="outlined-error-helper-text"
                        label="Display Name"
                        placeholder='Type your Display Name'
                        // helperText="Incorrect entry."
                        size="small"
                        required
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