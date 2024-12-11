import React from "react";

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
              <a href="/about-us" className="hover:text-teal-300 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="" className="hover:text-teal-300 transition duration-200">
                Workshops
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition duration-200">
                Event Highlights
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-teal-300 transition duration-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative text-center text-white py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Mirësevini në Menaxhimin e Konferencave
          </h1>
          <p className="text-xl mb-8">
            Platforma jonë është dizajnuar për të përmbushur nevojat e çdo organizatori të eventeve.
          </p>
          <a
            href="/menu"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition duration-300"
          >
            Fillo Tani
          </a>
        </div>
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