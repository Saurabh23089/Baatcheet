import { useEffect } from "react";

const Sample=({imageurl}) => {
    
    useEffect(() => {
        console.log(imageurl);
    },[imageurl])
    
   return (
       <>
       {imageurl&&<img src={imageurl} alt="pp"/>}
       </>
   )
}

export default Sample;