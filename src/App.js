import RouterView from './Router';
import app from './firebaseConfig';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    console.log('firebase app is : ' , app);
  } ,[]);
  
  return (
    
    <RouterView />
  );
}

export default App;
