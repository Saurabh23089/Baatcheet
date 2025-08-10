import React from "react";
import '../chatpage.css';
import '../firebase.js';
import Leftportion from './leftportion.js';
import Rightpart from './chat.js';


const Sample = () => {

  return (
    <>

      <div className="flex p-4 bg-transparent text-black dark:bg-transparent h-screen ">
        <Leftportion />
        <Rightpart />
      </div>

    </>
  )
}

export default Sample;