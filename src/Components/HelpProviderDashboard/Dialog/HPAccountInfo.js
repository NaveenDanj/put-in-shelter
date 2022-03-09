import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

//redux imports
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../../store/Slices/CurrentUserSlice';


//firebase imports
import {doc, getDoc , updateDoc ,  getFirestore } from "firebase/firestore"; 
import { getAuth, updateProfile } from "firebase/auth";


function HPAccountInfo(props) {

    
    let user = useSelector(state => state.currentUser);
    const db = getFirestore();
    const dispatch = useDispatch();

    const { open, setOpen} = props;
    
    const [error , setError] = React.useState('');
    const [success , setSuccess] = React.useState('');

    const [email , setEmail] = React.useState('');
    const [displayName , setDisplayName] = React.useState('');
    const [memberCount , setMemberCount] = React.useState(0);
    const [weeks , setWeeks] = React.useState(0);



    
    useEffect(() => {

        //set alert to empty
        setSuccess('');
        setError('');
        
        const userDocRef = doc(db , 'serviceProviderUser' , user.currentUser.uid);

        getDoc(userDocRef)
        .then(userInfo => {

            // set user info
            setEmail(userInfo.data().email);
            setDisplayName(userInfo.data().displayName);
            setMemberCount(userInfo.data().peopleCount);
            setWeeks(userInfo.data().timePeriod);
            console.log(userInfo);
        })
        .catch(err => console.log(err));
        
    } , []);


    const handleUpdateUserInfo = async (e) => {

        e.preventDefault();

        //validate data
        if(email === '' || displayName === '' || memberCount === 0 || weeks === 0){
            setError('Please fill out all fields');
            return;
        }

        try{
            //update user info
            const userDocRef = doc(db , 'helpWantedUsers' , user.currentUser.uid);
            
            await updateDoc(userDocRef , {
                email,
                displayName,
                peopleCount : +memberCount,
                timePeriod : +weeks
            });

            //update account display name
            const auth = getAuth();
            await updateProfile(auth.currentUser , {
                displayName
            });

            setSuccess('User info updated');
            dispatch( setCurrentUser(auth.currentUser) );
            

        }catch(err){
            setError(err.message);
        }

    }


    return (
        
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Help Provider Account Information</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description">
                    You can change/Update your account information here. Please note that you can only update your account information once every 24 hours.
                </DialogContentText>

                <form style={styles.formContainer} onSubmit={(e) => handleUpdateUserInfo(e)} >

                    { error !== '' &&  (
                        <>
                            <Alert severity="error">{error}</Alert><br/>
                        </>
                    )}

                    { success !== '' &&  (
                        <>
                            <Alert severity="success">{success}</Alert><br/>
                        </>
                    )}

                    <TextField
                        type={'email'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your email here'
                        // helperText="Incorrect entry."
                        size="small"
                        value={email}
                        disabled
                    /><br/>

                    <TextField
                        type={'text'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your Display Name here'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        helperText="Please enter your display name"
                    /><br/>

                    <TextField
                        type={'number'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your family members here'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        value={memberCount}
                        onChange={(e) => setMemberCount(e.target.value)}
                        helperText="Please enter the number of family members"
                    /><br/>

                    <TextField
                        type={'number'}
                        id="outlined-error-helper-text"
                        placeholder='Enter your weeks you want to stay'
                        // helperText="Incorrect entry."
                        size="small"
                        required
                        value={weeks}
                        onChange={(e) => setWeeks(e.target.value)}
                        helperText="Please enter the number of weeks you want to stay"
                    /><br/>

                    <Button 
                        type="submit" 
                        className="gradient-background" style={{ marginTop : 25 , color : 'white' , fontSize : '1em' , padding : 10 , border : '0px' , borderRadius : 8 }}
                    >
                        UPDATE ACCOUNT INFO
                    </Button>

                </form>


            </DialogContent>

            <DialogActions>

                <Button onClick={() => { 
                        setOpen(false);
                        setSuccess('');
                        setError('');
                    } 
                } 
                autoFocus>
                    Close
                </Button>

            </DialogActions>

        </Dialog>

    );

}

const styles = {

    formContainer : {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop : 25
    }


}


export default HPAccountInfo