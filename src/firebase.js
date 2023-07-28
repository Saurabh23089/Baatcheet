import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {getAuth,signInwithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  /*
  // Initialize a provider using this google auth provider
  const provider=new GoogleAuthProvider();

  export {provider};*/
  