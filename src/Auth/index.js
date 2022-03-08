import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";


export const isAuthenticated = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    
    return user !== null ? true : false;


}