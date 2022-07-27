import React from 'react';
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';

function Footer() {
  return (
    <footer
      className="
    fixed
    bottom-0
    w-full
    left-0
    bg-slate-900
    flex
    p-2
    justify-center"
    >
      <a href="https://github.com/yvasconcellos" target="_blank" rel="noreferrer">
        <img src={ github } alt="github" className="w-8 m-1" />
      </a>

      <a href="https://www.linkedin.com/in/yvasconcellos/" target="_blank" rel="noreferrer">
        <img src={ linkedin } alt="linkedin" className="w-8 m-1" />

      </a>
    </footer>
  );
}

export default Footer;
