import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
       {/* Header */}
       <header className="bg-blue-600 shadow-md">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
        <div className="text-3xl font-semibold text-center tracking-wide">Rrjeti i Konferencave 🌍💬</div>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="/" className="hover:text-teal-300 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-teal-300 transition duration-200">
                Menu
              </a>
            </li>
        
            <li>
              <a href="/contact-us" className="hover:text-teal-300 transition duration-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-teal-300 transition duration-200">
              Register
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-teal-300 transition duration-200">
              Log In
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Content */}
      <div className="pt-32 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-blue-600">Rreth Nesh</h2>
        <p className="text-lg mb-8 text-gray-600 leading-relaxed">
          Platforma jonë për menaxhimin e konferencave është projektuar për të përmirësuar organizimin dhe efikasitetin e çdo eventi.
          Ne jemi të përkushtuar për të ofruar mjetet më të avancuara për planifikimin, menaxhimin e pjesëmarrësve dhe ndjekjen e detajeve për një përvojë të suksesshme.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Përkushtimi</h3>
            <p className="text-gray-600">Ekipi ynë punon me pasion për të krijuar një platformë që plotëson nevojat e organizatorëve.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Inovacioni</h3>
            <p className="text-gray-600">Ne përmirësojmë vazhdimisht platformën tonë duke përdorur teknologjitë më të fundit.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Mbështetja</h3>
            <p className="text-gray-600">Ofrojmë mbështetje të plotë për të garantuar një përvojë të pandërprerë për përdoruesit.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 absolute bottom-0 w-full">
      <p>&copy; 2024 Rrjeti i Konferencave 🌍💬. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
