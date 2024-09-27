import React from "react";
import Image from "next/image";
import Logo from "../../public/store.png";

interface HeaderProps {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
  filterOptions: string[];
}

const Header: React.FC<HeaderProps> = ({
  timeRange,
  setTimeRange,
  filterOptions,
}) => {
  return (
    <header className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-white via-pink-100 to-pink-200 shadow-md rounded-lg">
      <div className="flex items-center">
        <Image
          src={Logo}
          alt="Reality Shop Logo"
          width={40}
          height={20}
          className="mr-2"
        />
        <h1 className="hidden md:block text-3xl font-bold text-black font-poppins">
          Reality<span className="text-purple-500">Shop</span>
        </h1>
      </div>
      <div className="flex items-center">
        <label className="mr-4 text-lg font-semibold text-white hidden md:block">
          Filter by:
        </label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 bg-white border border-gray-300 rounded-lg text-black"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
