import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function HeaderContent(context) {

    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/helpwantsignup", { replace: true });
    }
    
    return (
        <>
            <h1 style={styles.headerText}>#CODEFORUKRAINE</h1>
            <h2 style={styles.subtitle }>Help to find a shelter</h2>

            <div style={styles.content}>
                <p style={{ marginTop : -5 }}>
                    “Every gun that is made, every warship launched, every rocket fired, signifies in the final sense a theft from those who hunger and are not fed, those who are cold and are not clothed.” – Dwight D. Eisenhower
                </p><br/>
                
                <div style={{ width : '100%' , textAlign : 'center' , display : 'flex' , justifyContent : 'space-around' , alignItems : 'center' , marginTop : 15}}>
                    <Button onClick={() => handleClick() } style={{ color: "#21b6ae", border : '1px solid white' }}  variant="outlined">I WANT HELP</Button>
                    <Button onClick={() => navigate("/serviceProvidersignup", { replace: true }) } style={{ color: "#21b6ae", border : '1px solid white' }} variant="outlined">I WANT TO HELP</Button>
                </div>

            </div>


        </>
    )
}


const styles = {

    headerText : {
        color : 'white',
        fontSize: '4em',
        textAlign: 'center',
    },

    subtitle : {
        color : 'white',
        fontSize: '2em',
        textAlign: 'center',
        marginTop : -5
    },

    content : {
        color : 'white',
        justifyContent: 'center',
        width : '50%',
        textAlign: 'center',
    }


}

export default HeaderContent