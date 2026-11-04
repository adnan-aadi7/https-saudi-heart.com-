import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { NationalLifeSupportLogo } from './logos/Logos';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: 'https://saudi-heart.com/' },
    { name: 'Courses', href: 'https://saudi-heart.com/' },
    { name: 'Online Courses', href: 'https://saudi-heart.com/' },
    { name: 'Training Centers', href: 'https://saudi-heart.com/' },
    { name: 'Become Training Center', href: 'https://saudi-heart.com/' },
    { name: 'Certificate Verification', href: '#', active: true },
    { name: 'Browse for old CPR website', href: 'https://shacpr.org.sa/' },
    { name: 'For Instructors and Coordinator', href: 'https://saudi-heart.com/' },
  ];

  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Official Logo */}
        <a
          href="https://saudi-heart.com/"
          className="flex items-center hover:opacity-95 transition-opacity"
        >
          <NationalLifeSupportLogo isDarkTheme={false} />
        </a>

        {/* Right: Exact 3-line Hamburger Menu Button as in Image 1 */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8 stroke-[2.5]" />
            ) : (
              <div className="w-7 h-5 flex flex-col justify-between">
                <span className="w-full h-1 bg-black rounded-full block"></span>
                <span className="w-full h-1 bg-black rounded-full block"></span>
                <span className="w-full h-1 bg-black rounded-full block"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Slide-down / Mobile & Desktop Nav Menu Drawer */}
      {isMenuOpen && (
        <div className="bg-white border-b border-gray-200 shadow-xl transition-all">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    link.active
                      ? 'bg-teal-50 text-teal-900 border border-teal-200/60 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.href.startsWith('http') && (
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
