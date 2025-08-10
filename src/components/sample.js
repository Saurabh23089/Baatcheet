import React from "react";
import '../chatpage.css';
import '../firebase.js';
import Leftportion from './leftportion.js';
import Rightpart from './chat.js';


const Sample = () => {

  return (
    <>

      <div className="flex p-4 bg-white text-black dark:bg-gray-900 h-screen  ">
        <Leftportion />
        <Rightpart />
      </div>

    </>
  )
}

export default Sample;