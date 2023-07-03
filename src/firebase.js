import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {getAuth,signInwithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
   
    authDomain: "baatcheet-dbf94.firebaseapp.com",
    projectId: "baatcheet-dbf94",
    storageBucket: "baatcheet-dbf94.appspot.com",
    messagingSenderId: "772908735038",
    appId: "1:772908735038:web:8f120b5b90c6b190f44f6f"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  /*
  // Initialize a provider using this google auth provider
  const provider=new GoogleAuthProvider();

  export {provider};*/
  