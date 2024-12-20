import React from "react";
import { Link } from 'react-router-dom';
import heroImage from "./image.png";

const MenaxhimiKonferencave = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <nav className="flex justify-between items-center px-8 py-6 text-white">
          <div className="text-3xl font-extrabold">Menaxhimi i Konferencave</div>
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
              <a href="/about-us" className="hover:text-teal-300 transition duration-200">
             About Us
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

      {/* Hero Section */}
      <section
  id="hero"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Use full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0 2px 5px rgba(0, 0, 0, 0.7)",
    padding: "0 20px", // Ensure some padding for smaller screens
  }}
>
  <h1 style={{ fontSize: "4rem", fontWeight: "700" }}>Mirësevini në Platformën tonë</h1>
  <p style={{ fontSize: "1.5rem", fontWeight: "400", maxWidth: "700px", textAlign: "center" }}>
    Organizoni konferenca dhe menaxhoni sponsorë me lehtësi!
  </p>
  <a href="/menu" className="btn btn-warning btn-lg mt-3">Shiko më shumë</a>

</section>
      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Veçoritë</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_9.jpg"
                alt="Planifikimi i Konferencave"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Planifikoni Konferencat
              </h3>
              <p className="text-gray-600">
                Përgatitni një plan të hollësishëm për çdo event që organizoni. Ne ofrojmë mjete të fuqishme për planifikimin dhe menaxhimin e çdo detaji.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_2.jpg"
                alt="Pjesëmarrësit"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Menaxhoni Pjesëmarrësit
              </h3>
              <p className="text-gray-600">
                Lista e pjesëmarrësve ju mundëson të mbani të dhëna të sakta dhe t’i organizoni ata në mënyrë efikase për çdo aktivitet.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <img
                src="gallery/photo_3.jpg"
                alt="Përditësime në Kohë Reale"
                className="rounded-xl mb-6 transition-transform transform hover:scale-105"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Përditësime të Menjëhershme
              </h3>
              <p className="text-gray-600">
                Informoni pjesëmarrësit tuaj për ndryshime të papritura dhe përditësime në kohë reale gjatë gjithë ngjarjes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Momentet e Konferencave
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Shikoni disa nga momentet më të mira të kapura nga konferencat. Klikoni mbi imazhet për të shikuar më shumë.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          <img
            src="gallery/photo_4.jpg"
            alt="Moment 1"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_1.jpg"
            alt="Moment 2"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_6.jpg"
            alt="Moment 3"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_4.jpg"
            alt="Moment 4"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_8.jpg"
            alt="Moment 5"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_5.jpg"
            alt="Moment 6"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_10.jpg"
            alt="Moment 7"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
          <img
            src="gallery/photo_9.jpg"
            alt="Moment 8"
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        &copy; 2024 Menaxhimi i Konferencave. Të gjitha të drejtat të rezervuara.
      </footer>
    </div>
  );
};

export default MenaxhimiKonferencave;