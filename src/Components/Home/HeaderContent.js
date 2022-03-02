import React from 'react'
import Button from '@mui/material/Button';

function HeaderContent() {
  return (
      <>
        <h1 style={styles.headerText}>SIMPLE / BEAUTIFUL</h1>
        <h2 style={styles.subtitle }>LANDING PAGE</h2>

        <div style={styles.content}>
            <p style={{ marginTop : -5 ,}}>Aliquip dolor culpa ad officia tempor eu id do reprehenderit. Ex dolore ea anim laboris ea nostrud quis labore aliquip laboris incididunt. Officia exercitation nostrud laboris aute quis. Reprehenderit non veniam mollit sint dolor proident ad. Ea laboris duis sint duis consectetur cillum commodo aliqua ullamco.</p><br/>
            
            <div style={{ width : '100%' , textAlign : 'center' , display : 'flex' , justifyContent : 'space-around' , alignItems : 'center' , marginTop : 15}}>
                <Button style={{ color: "#21b6ae", border : '1px solid white' }}  variant="outlined">I WANT HELP</Button>
                <Button style={{ color: "#21b6ae", border : '1px solid white' }} variant="outlined">I WANT TO HELP</Button>
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