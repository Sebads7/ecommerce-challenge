import React from "react";

const Footer = () => {
  return (
    <div className="w-full  bg-orange-500  ">
      <div className="py-10 flex justify-center gap-1">
        Challenge by
        <a
          rel="noreferrer noopener"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="pr-5 text-stone-700"
        >
          Frontend Mentor.
        </a>
        Coded by
        <a href="#" className="text-stone-700">
          Sebastian Di Salvatore.
        </a>
      </div>
    </div>
  );
};

export default Footer;
