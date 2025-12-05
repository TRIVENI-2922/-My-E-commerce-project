import React from 'react';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { BUSINESS_LOCATION, BUSINESS_NAME, BUSINESS_PHONE, GOOGLE_MAP_EMBED_URL } from '../constants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4">{BUSINESS_NAME}</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              We provide the freshest fruits in Khammam at unbeatable wholesale and retail prices. 
              Direct from farmers to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition"><Facebook size={20}/></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><Instagram size={20}/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-yellow-400 transition">All Fruits</Link></li>
              <li><Link to="/prices" className="hover:text-yellow-400 transition">Today's Price List</Link></li>
              <li><Link to="/wholesale" className="hover:text-yellow-400 transition">Bulk Orders</Link></li>
              <li><Link to="/login" className="hover:text-yellow-400 transition">Login / Register</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-yellow-400" size={18} />
                <span>{BUSINESS_LOCATION}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-yellow-400" size={18} />
                <a href={`tel:+91${BUSINESS_PHONE}`} className="hover:text-white">{BUSINESS_PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-yellow-400" size={18} />
                <a href="mailto:contact@trivenifruits.com" className="hover:text-white">contact@trivenifruits.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="flex-shrink-0 text-yellow-400" size={18} />
                <span>Mon - Sun: 5:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="h-48 rounded-lg overflow-hidden border-2 border-green-700">
            <iframe 
              src={GOOGLE_MAP_EMBED_URL} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Khammam Location"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <div className="mt-2 space-x-4">
             <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
             <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
