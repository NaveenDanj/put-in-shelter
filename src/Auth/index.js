import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc , getFirestore } from "firebase/firestore";

const db = getFirestore();

export const isAuthenticated =  () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}

export const getAuthenticatedUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}

export const getLoggedInUserType = async () => {

    if(isAuthenticated()){

        let uid = getAuthenticatedUser().uid;

        //if user is authentiacated we have to find his user type and return it
        const helpWantedRef = doc(db, "helpWantedUsers", uid);
        const helpWantedSnap = await getDoc(helpWantedRef);

        const providerRef = doc(db , 'serviceProviders' , uid);
        const providerSnap = await getDoc(providerRef);

        if(helpWantedSnap.exists){
            return 'helpWanted';
        }

        if(providerSnap.exists){
            return 'serviceProvider';
        }
        
        //user is unauthenticated!
        return null;

    }

}