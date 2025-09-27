// src/components/Footer.tsx (Create this file)
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t p-4 mt-12 bg-gray-50 text-center text-sm">
      <nav className="flex justify-center space-x-4 mb-2">
        {/* AdSense REQUIRED: Link to your Privacy Policy page */}
        <Link href="/privacy-policy" className="hover:underline text-gray-700">
          गोपनीयता नीति (Privacy Policy)
        </Link>
        
        {/* REQUIRED: Link to your Terms of Service page */}
        <Link href="/terms-of-service" className="hover:underline text-gray-700">
          सेवा की शर्तें (Terms of Service)
        </Link>

        {/* Existing Navigation Links */}
        <Link href="/about" className="hover:underline text-gray-700">
          About
        </Link>
        <Link href="/contact" className="hover:underline text-gray-700">
          Contact
        </Link>
      </nav>
      <p className="text-gray-600">
        &copy; {new Date().getFullYear()} MetaTube Inspector. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
