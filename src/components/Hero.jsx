export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
            Masak Apapun dari Bahan yang Kamu Punya
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Teman Masak menggunakan AI canggih untuk merekomendasikan resep lezat berdasarkan apa yang ada di dapur mu. Masak pintar, bebas pusing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              Mulai Chatting!
            </button>
            <button className="border-2 border-gray-300 text-dark px-8 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition">
              Lihat Cara Kerja
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-yellow-50 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <span className="text-9xl">👨‍🍳👧</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
