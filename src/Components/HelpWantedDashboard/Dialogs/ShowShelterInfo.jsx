import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function ShowShelterInfo(props) {
    
    const { open, setOpen , shelter } = props;
    
    if(!shelter){
        return <div>Loading...</div>;
    }

    return (
        <Dialog
            fullWidth = {true}
            maxWidth = "sm"
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogTitle id="alert-dialog-title">{"Shelter Info"}</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description">
                    Shelter Name: {shelter.displayName}<br/>
                    Shelter Address: {shelter.address}<br/>
                    {/* Shelter Phone: {shelter.phone}<br/> */}
                    Shelter Email: {shelter.email}<br/>
                    {/* Shelter Website: {shelter.website}<br/>
                    Shelter Description: {shelter.description}<br/> */}
                </DialogContentText><br/>

            </DialogContent>


        </Dialog>
    )
}

export default ShowShelterInfo