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

        <Link
            href="/assistant"
            className="relative px-3 py-2 text-gray-800 hover:text-blue-600 transition after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
        >
          Assistant
        </Link>

        {/* About */}
        <Link
          href="/about"
          className="relative px-3 py-2 text-gray-800 hover:text-blue-600 transition after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
        >
          About Ambrosia
        </Link>
      </div>
    </nav>
  );
}
