import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4x text-white">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" className="w-10 m-4 transition duration-300 hover:filter hover:brightness-125 hover:drop-shadow-lg cursor-pointer" width={40} height={40} />
      </div>
      <h1 className="text-2xl font-russo font-normal select-none">Team Watch</h1>
      <div className="flex items-center w-10 m-4 invisible">
        {/* Placeholder for user login info */}
      </div>
    </header>
  );
};

export default Header;
