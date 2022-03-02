import React from 'react'
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function HelpWantedOtherInfo() {
  return (

    <div className='gradient-background' style={ styles.mainContainer }>

        <Card style={ styles.formContainer} variant="outlined">
            
            <h1 style={ styles.headerText }>Personal Info</h1>

            <form style={styles.fieldContainer}>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Gender"
                    size='small'
                >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    <MenuItem value={30}>Other</MenuItem>
                </Select><br />

                <TextField
                    type={'number'}
                    id="outlined-error-helper-text"
                    label="Peoples in your family"
                    placeholder='Enter number of people in your family'
                    // helperText="Incorrect entry."
                    size="small"
                    required
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