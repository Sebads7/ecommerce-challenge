import React from "react";

const Footer = () => {
  return (
    <div className="w-full  bg-orange-500  ">
      <div className="py-10 flex xs:flex-col sm:flex-row items-center justify-center gap-1">
        <a
          rel="noreferrer noopener"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="pr-5 text-stone-700"
        >
          Challenge by Frontend Mentor.
        </a>

        <a href="#" className="text-stone-700 flex gap-1">
          Coded by <p className="font-bold"> Sebastian Di Salvatore.</p>
        </a>
      </div>
    </div>
  );
};

export default Footer;
