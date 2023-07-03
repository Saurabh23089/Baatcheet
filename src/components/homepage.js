import {useLocation} from 'react-router-dom'; 
/* The useLocation hook is used to access the current location object,
 which contains information about the current URL and navigation state.*/


function Homepage(){

    const location=useLocation();
    const photoURL=location.state.photoURL;

    
   // console.log(photoURL);

    return (
        <div className='nav1'>
            <img src={photoURL} alt="profileImage" className='pp'/>
            <h1>Shigr Mulakat hogi!</h1>
        </div>
    )
}
    

export default Homepage;