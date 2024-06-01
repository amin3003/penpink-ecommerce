import React from 'react';

const NavSection = (props: { title: any; links: any }) => {
  return (
    <nav className="flex flex-col items-center md:items-end mx-auto">
      <h6 className="footer-title">{props.title}</h6>
      {props.links.map((link: string, index: number) => (
        <a
          key={index}
          className="link link-hover !text-[12px] text-center md:text-end !leading-6"
        >
          {link}
        </a>
      ))}
    </nav>
  );
};

export default NavSection;
