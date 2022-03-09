import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//redux imports
import { useSelector , useDispatch } from 'react-redux';

//firebase imports
import {doc, getDoc , updateDoc ,  getFirestore } from "firebase/firestore"; 


function SetAvailablity(props) {

    let user = useSelector(state => state.currentUser.currentUser);

    const { open, setOpen } = props;
    const [availableText , setAvailableText] = React.useState('');
    const [error , setError] = React.useState('');

    //get user data
    const getUserData = async () => {

        try{

            const userDocRef = doc(getFirestore() , 'serviceProviderUser' , user.uid);
            const userDoc = await getDoc(userDocRef);

            if(!userDoc.exists()){
                setError('User not found');
                return;
            }

            
            if(userDoc.data().availability === 'Available'){
                setAvailableText('Not Available');
            }else{
                setAvailableText('Available');
            }

        }catch(err){
            setError('Error getting user data');
        }


    }

    //set status
    const handleChangeStatus = async () => {
            
        try{

            const userDocRef = doc(getFirestore() , 'serviceProviderUser' , user.uid);
            const userDoc = await getDoc(userDocRef);

            if(!userDoc.exists()){
                setError('User not found');
                return;
            }

            if(userDoc.data().availability === 'Available'){
                await updateDoc(userDocRef , {availability : 'Not Available'});
                setAvailableText('Available');

            }else{
                await updateDoc(userDocRef , {availability : 'Available'});
                setAvailableText('Not Available');
            }

            setError('');
        }catch(err){
            setError('Error setting status');
        }
    
    }

    useEffect(() => {

        getUserData();

    } ,[open]);

    return (
        <Dialog
            fullWidth = {true}
            maxWidth = "sm"
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">{"Set Availability"}</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description"> Change your availability status here </DialogContentText><br/>

                <Button variant="contained" color="primary" onClick={ () => handleChangeStatus() } >
                    Set { availableText }
                </Button>

            </DialogContent>

            <DialogActions>

                <Button autoFocus onClick={() => setOpen(false)  }>
                    Close
                </Button>

            </DialogActions>


        </Dialog>
    );
}

export default SetAvailablity