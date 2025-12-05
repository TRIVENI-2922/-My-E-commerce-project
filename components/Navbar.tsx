import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Phone, LogOut, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_PHONE } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, user, logout } = useStore();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Today\'s Price', path: '/prices' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'About & Contact', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-800 font-bold text-xl">
                TR
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-green-800 leading-tight">Triveni Renuka</h1>
                <p className="text-xs text-yellow-600 font-medium">Wholesale Fruits Khammam</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Link (Only if admin) */}
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                <ShieldCheck size={16} /> Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a href={`tel:+91${BUSINESS_PHONE}`} className="hidden lg:flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-200 transition">
              <Phone size={16} />
              <span>{BUSINESS_PHONE}</span>
            </a>

            <Link to="/checkout" className="relative p-2 text-gray-600 hover:text-green-600 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
               <button onClick={logout} className="p-2 text-gray-600 hover:text-red-600 transition" title="Logout">
                <LogOut size={24} />
              </button>
            ) : (
              <Link to="/login" className="p-2 text-gray-600 hover:text-green-600 transition" title="Login">
                <User size={24} />
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-green-600 focus:outline-none p-2"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
             {user?.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-red-600 bg-red-50">
                Admin Panel
              </Link>
            )}
            {!user && (
               <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-blue-600 bg-blue-50">
               Customer Login
             </Link>
            )}
             {user && (
               <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-red-600 bg-red-50">
               Logout ({user.name})
             </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
