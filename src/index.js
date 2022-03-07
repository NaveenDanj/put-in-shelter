import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store'
import { Provider } from 'react-redux'
import app from './firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";


console.log('i ran first');


//check if there are any authenticated user exists

const checkAuthUserExists = () => {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //if found user set that user to localstorage
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      //if no user found set null to localstorage
      localStorage.setItem('currentUser', null);
    }

});

}



const mountReactApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

checkAuthUserExists();
mountReactApp();
