import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-10 p-4 text-2xl sm:text-4xl font-bold text-center text-white uppercase bg-[#161616]">
      <span>
        <Link to="/youtube" className="text-[#ff0000] hover:text-[#ff0000b9]">YouTube</Link>
      </span>
      |
      <span>
        <Link to="/spotify" className="text-[#23d443] hover:text-[#30ff5d]">Spotify</Link>
      </span>
    </nav>
  );
};

export default Navbar;
