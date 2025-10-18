'use client';

import Link from 'next/link';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      {/* Top section: logo on the left */}
      <div className="max-w-6xl flex items-center p-6 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Ambrosia Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-gray-800">Ambrosia</span>
        </Link>
      </div>

      {/* Bottom section: NavBar below the header */}
      <div className="border-t border-gray-200">
        <NavBar />
      </div>
    </header>
  );
}
