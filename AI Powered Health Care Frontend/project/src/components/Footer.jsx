import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaBriefcase } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get our wellness newsletter</h3>
            <p className="text-gray-600 mb-6">
              Filter out the noise and nurture your inbox with health and wellness advice that's inclusive and rooted in medical expertise.
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Sign Up
              </button>
            </div>
            <p className="text-sm text-gray-500">Your privacy is important to us</p>
            
            {/* Team Avatars */}
            <div className="flex -space-x-4 mt-8">
              <img className="w-10 h-10 rounded-full border-2 border-white shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="Team member" />
              <img className="w-10 h-10 rounded-full border-2 border-white shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="Team member" />
              <img className="w-10 h-10 rounded-full border-2 border-white shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="Team member" />
              <img className="w-10 h-10 rounded-full border-2 border-white shadow-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" alt="Team member" />
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">
                +3
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-8">
            <div className="flex justify-start space-x-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://portfolio.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaBriefcase className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
            
            <nav className="grid grid-cols-2 gap-4">
              <Link to="/about" className="text-gray-500 hover:text-gray-700">About Us</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700">Privacy Policy</Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-700">Contact Us</Link>
              <Link to="/medical" className="text-gray-500 hover:text-gray-700">Medical Affairs</Link>
              <Link to="/content" className="text-gray-500 hover:text-gray-700">Content Integrity</Link>
              <Link to="/newsletters" className="text-gray-500 hover:text-gray-700">Newsletters</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 NextGenTechies Media LLC. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-400 hover:text-gray-300 text-sm">About</Link>
              <Link to="/careers" className="text-gray-400 hover:text-gray-300 text-sm">Careers</Link>
              <Link to="/advertise" className="text-gray-400 hover:text-gray-300 text-sm">Advertise with us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;