"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Hospital Meals<span className="text-gray-700">Pro</span>
          </h1>
          <nav className="flex space-x-6">
            <a href="#about" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-indigo-600">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center py-16 px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-6">
          Efficient Hospital Meal Management
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl">
          Streamline meal preparation and delivery for patients, staff, and the
          hospital team with a modern, easy-to-use dashboard.
        </p>
        <Link href="/login">
        <button className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition">
          Login
        </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-4">
        <div className="container mx-auto text-center">
          <p>
            Made with ❤️ by <span className="text-indigo-600 font-bold"><Link href={"https://www.linkedin.com/in/pranav-molawade"}>Pranav Molawade</Link></span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
