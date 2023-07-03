import { provider } from '../firebase.js';
import Homepage from './homepage.js';
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {useNavigate } from 'react-router-dom';

function Login(){
   
    const provider=new GoogleAuthProvider();
    provider.addScope('profile');
    const navigate=useNavigate();

    const signinwithgoogle=() => {
        const auth=getAuth();
        signInWithPopup(auth,provider)
       .then((result) => {
           const user=result.user;
           console.log(user);
           console.log('Sign In Successfull',user);

            /* The first arguement to the navigate function is the path and the second arguement
              is an options object which is used to pass additional options to navigation.Here 
              he options object has a state property that contains an object with a photoURL property.
            */
           navigate('/Homepage',
           {state:{photoURL:user.photoURL}}
           );
          
       })
       
       .catch((error) => {
           const errorcode=error.code;
           const errormessage=error.message;
           console.log('Sign In Failed',errormessage,errorcode);
       })
    }

    const handleonclick=(e)=> {
       e.preventDefault();
       signinwithgoogle();  
    }

    return (
        <>
          <h1 onClick={handleonclick}>Login With Google</h1>
        </>
    )
}

export default Login;
