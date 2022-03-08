import RouterView from './Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/Slices/CurrentUserSlice';

function App() {

  const dispatch = useDispatch();


  useEffect(() => {

    console.log('app component mounted : ' , JSON.parse( localStorage.getItem( 'currentUser' ) ) );

    //get current user
    if(localStorage.getItem('currentUser') != null){
      console.log("app : user found")
      //if user found set that user to store
      dispatch( setCurrentUser( JSON.parse( localStorage.getItem( 'currentUser' ) ) ) );
    }else{
      console.log("app : user not found");
      //if no user found set null to store
      dispatch( setCurrentUser( null ) );
    }

  } , []);

  return (<RouterView />);

}

export default App;
