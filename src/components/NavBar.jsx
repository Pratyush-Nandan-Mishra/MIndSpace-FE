import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ShakteLogo from "../assets/shakte.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "Features", "About", "Contact"];

  return (
    <nav className=" bg-gray-950 text-white shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400"><img src={ShakteLogo} width="70" alt="Shakte" /></div>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a href={`#${link.toLowerCase()}`} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
                {link}
              </a>
            ))}
          </div>


          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700 dark:text-gray-200">
              {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#10091f] text-white shadow-md px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a href={`#${link.toLowerCase()}`} className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">
              {link}
            </a>
          ))}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
