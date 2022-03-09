import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function SetAvailablity(props) {

    const { open, setOpen } = props;

    return (
        <Dialog
                fullWidth = {true}
                maxWidth = "md"
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

            <DialogTitle id="alert-dialog-title">{"Set Availability"}</DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description"> Please select your current location on the map.</DialogContentText><br/>

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