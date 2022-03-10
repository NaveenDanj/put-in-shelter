import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { IconButton  } from '@mui/material';

//icons
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import OfflineShareIcon from '@mui/icons-material/OfflineShare';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import AvTimerIcon from '@mui/icons-material/AvTimer';

function ShelterInfo(props) {

    const { setRouter , shelter } = props;

    return (
        <div style={{ width : 400}}>
            <h1 style={{ fontWeight : 'bold' }}>Shelter Info</h1>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <AccessTimeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Availablity" secondary={ shelter.availability } />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={shelter.displayName} />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <EmailIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={shelter.email} />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <PeopleIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="People Can serve" secondary={shelter.peopleCount} />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <AvTimerIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Time Period" secondary={shelter.timePeriod} />
                </ListItem>

            </List>

            <div style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-around' , width : '100%' }}>

                <IconButton color="secondary" aria-label="add an alarm" >
                    <LocalCarWashIcon />
                </IconButton>

                <IconButton color="secondary" aria-label="add an alarm" >
                    <QuestionAnswerIcon />
                </IconButton>

                <IconButton color="secondary" aria-label="add an alarm" >
                    <OfflineShareIcon />
                </IconButton>

            </div>



            {/* <button onClick={() => setRouter('Sample routing value')} >Click me</button> */}
        </div>
    );
}

export default ShelterInfo