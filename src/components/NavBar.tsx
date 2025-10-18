'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full bg-gray-50 shadow-inner">
      <div className="max-w-6xl mx-auto w-3/4 flex justify-start items-center gap-6 p-2">
        {/* Home */}
        <Link
          href="/"
          className="relative px-3 py-2 text-gray-800 hover:text-blue-600 transition after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
        >
          Home
        </Link>

        {/* About Ambrosia с дропдауном */}
        <div className="relative group">
          <button className="relative px-3 py-2 text-gray-800 hover:text-blue-600 transition after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full">
            About Ambrosia
          </button>
          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-1 w-48 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
            <Link href="/team" className="block px-4 py-2 text-gray-800 hover:text-blue-600 hover:bg-gray-50">
              Team
            </Link>
            <Link href="/mission" className="block px-4 py-2 text-gray-800 hover:text-blue-600 hover:bg-gray-50">
              Mission
            </Link>
          </div>
        </div>

        {/* Contact */}
        <Link
          href="/contact"
          className="relative px-3 py-2 text-gray-800 hover:text-blue-600 transition after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
