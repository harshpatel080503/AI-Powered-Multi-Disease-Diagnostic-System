import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { 
  FaSyringe, 
  FaHeartbeat, 
  FaBrain, 
  FaFemale, 
  FaLungs, 
  FaNotesMedical 
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Diabetes', path: '/diabetes', icon: FaSyringe },
    { name: 'Heart', path: '/heart', icon: FaHeartbeat },
    { name: 'Parkinson', path: '/parkinson', icon: FaNotesMedical },
    { name: 'Breast Cancer', path: '/breast-cancer', icon: FaFemale },
    { name: 'Tuberculosis', path: '/tuberculosis', icon: FaLungs },
    { name: 'Brain Tumor', path: '/brain-tumor', icon: FaBrain },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-primary-600 font-bold text-xl hover:text-primary-700">
              NextGenTechies
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative p-3 text-gray-600 hover:text-primary-600 transition-all duration-300"
              >
                <link.icon className="h-6 w-6 transition-all duration-300 group-hover:blur-[1px]" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;