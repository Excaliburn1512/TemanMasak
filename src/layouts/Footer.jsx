export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍳</span>
              <span className="font-bold text-dark">Teman Masak</span>
            </div>
            <p className="text-gray-600 text-sm">
              Membuat memasak lebih mudah dengan rekomendasi resep berbasis AI
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-dark mb-4">Tentang Kami</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-dark mb-4">Dukungan</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-dark mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Kitchen Safety</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {currentYear} Teman Masak. Made for the joy of cooking
          </p>
        </div>
      </div>
    </footer>
  );
}
