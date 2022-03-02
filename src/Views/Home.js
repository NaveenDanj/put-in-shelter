import React from 'react'
import HeaderContent from '../Components/Home/HeaderContent'
import '../css/Home.css'

function Home() {
  return (
    <div className='gradient-background' style={styles.mainContainer}>
        <HeaderContent />
    </div>
  )
}

const styles = {

    mainContainer: {
        color : 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }

}

export default Home