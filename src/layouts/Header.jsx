import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">🍳</span>
            <span className="text-2xl font-bold text-dark">Teman Masak</span>
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-dark hover:text-primary transition">Fitur Utama</a>
            <a href="#how-it-works" className="text-dark hover:text-primary transition">Cara Kerja</a>
            <a href="#contact" className="text-dark hover:text-primary transition">Kontak</a>
          </div>

          <button className="hidden md:block bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Login
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#features" className="block text-dark hover:text-primary transition py-2">Fitur Utama</a>
            <a href="#how-it-works" className="block text-dark hover:text-primary transition py-2">Cara Kerja</a>
            <a href="#contact" className="block text-dark hover:text-primary transition py-2">Kontak</a>
            <button className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
