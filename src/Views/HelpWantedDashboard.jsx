import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';


//firebase import
import { doc, getDoc , getFirestore } from "firebase/firestore";
import { getAuth , signOut  } from 'firebase/auth';

//redux imports
import {useSelector , useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/Slices/CurrentUserSlice';


//components
import '../css/back.css';
import MapContainer from '../Components/HelpWantedDashboard/MapContainer';
import AccountInfo from '../Components/HelpWantedDashboard/Dialogs/AccountInfo';
import SetMyLocation from '../Components/HelpWantedDashboard/Dialogs/SetMyLocation'

//router dom
import { useNavigate } from "react-router-dom";



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function HelpWantedDashboard() {

  let user = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const [loading , setLoading] = React.useState(true);

  React.useEffect(() => {

    const handleUserType = async () => {

      try{
        
        const userDocRef = doc(getFirestore() , 'helpWantedUsers' , user.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        console.log('selected file : ' , userDoc.exists());
       
        if(!userDoc.exists()){
          setLoading(false);
          navigate("/");
        }

        setLoading(false);

      }catch(err){
        console.log(err);
        setLoading(false);
        navigate("/");
      }
  
    }

    handleUserType();

  } , []);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //Account info dialog
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = React.useState(false);
  const [addLocationDialogOpen , setAddLocationDialogOpen] = React.useState(false);

  let navigate = useNavigate();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  //handle logout
  const handleLogout = async () => {

    const auth = getAuth();

    console.log('logout');

    try{
      await signOut(auth);
      dispatch(setCurrentUser({}));
      localStorage.setItem('currentUser' , null);
      navigate("/");
    }catch(err){
      console.log(err);
    }


  }


  if(!loading){

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar className='gradient-background' position="fixed" open={open}>
          <Toolbar>
            <IconButton
              className='gradient-background'
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              HELP WANTED DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer  variant="permanent" open={open}>

          <DrawerHeader>
              <label style={{ fontWeight : 'bold' }}>PUT IN SHELTER</label>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>


            <ListItemButton
              key={'My Profile'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setAccountInfoDialogOpen(true)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AccountCircleIcon /> 
              </ListItemIcon>
              <ListItemText primary={'My Profile'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton
              key={'Set My Location'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setAddLocationDialogOpen(true)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AddLocationIcon /> 
              </ListItemIcon>
              <ListItemText primary={'Set My Location'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

            <ListItemButton
              key={'Logout'}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => handleLogout()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon /> 
              </ListItemIcon>
              <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>


          </List>

          <Divider />

        </Drawer>


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          
          <MapContainer />

          <AccountInfo 
            open={accountInfoDialogOpen}
            setOpen={setAccountInfoDialogOpen}
            onClose={() => setAccountInfoDialogOpen(false)}
          />

          <SetMyLocation 
            open={addLocationDialogOpen}
            setOpen={setAddLocationDialogOpen}
            onClose={() => setAddLocationDialogOpen(false)}
          />

        </Box>

      </Box>
    );

  }else{
    return ( <div>Loading...</div> );
  }
}