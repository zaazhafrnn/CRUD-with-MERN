import React from 'react';
import { PiGithubLogoBold } from "react-icons/pi";

function Footer() {

  return (
    <footer className="bg-gray-900 text-white px-8 py-14 text-xl text-bold font-black flex justify-between">
      <p className="">
        Copyright © 2024. All rights reserved.  
      </p>
      
      <a href="https://github.com/zaazhafrnn">
        <PiGithubLogoBold />
      </a>
    </footer>
  );
}

export default Footer;