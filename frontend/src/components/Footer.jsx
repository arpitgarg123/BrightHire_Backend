import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className= " bg-white border-t shadow-sky-950 py-10">
      <div className="container mx-auto text-center flex items-center justify-between px-12 max-sm:p-2">
           <div>
           <h1 className='text-2xl font-bold max-sm:text-xl'>Bright<span className='text-[#F83002]'>Hire</span> </h1>
           <p className="text-sm max-sm:text-xs">&copy; {new Date().getFullYear()} BrightHire. All rights reserved.</p>
           </div>
        <div className="flex justify-center items-center space-x-4 text-3xl max-sm:text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
          <FaSquareXTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <FaInstagramSquare />
          </a>
        </div>  
      </div>
    </footer>
  );
};

export default Footer;
